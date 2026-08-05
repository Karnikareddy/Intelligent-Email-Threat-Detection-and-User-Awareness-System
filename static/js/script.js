const btnOpenAnalyzer = document.getElementById('btn-open-analyzer');
const modalAnalyzer = document.getElementById('modal-analyzer');
const btnCloseResults = document.getElementById('btn-close-results');
const resultsContainer = document.getElementById('results-container');
const formAnalyzer = document.getElementById('analyzer-form');
const loading = document.getElementById('loading');

// Modules
const modules = ['confidence', 'dashboard', 'quiz', 'summary', 'feedback'];
modules.forEach(mod => {
    document.getElementById(`mod-${mod}`).addEventListener('click', () => {
        openModal(`modal-${mod}`);
        if(mod === 'dashboard') fetchDashboard();
    });
});

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

btnOpenAnalyzer.addEventListener('click', () => {
    openModal('modal-analyzer');
});

btnCloseResults.addEventListener('click', () => {
    resultsContainer.classList.add('hidden');
    btnOpenAnalyzer.classList.remove('hidden');
    document.querySelector('.welcome-title').classList.remove('hidden');
    document.querySelector('.subtitle').classList.remove('hidden');
});

formAnalyzer.addEventListener('submit', async (e) => {
    e.preventDefault();
    loading.classList.remove('hidden');
    formAnalyzer.classList.add('hidden');

    const payload = {
        subject: document.getElementById('inp-subject').value,
        body: document.getElementById('inp-body').value,
        urls: document.getElementById('inp-urls').value
    };

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        
        displayResults(result, payload.urls);
        updateBackgroundState(result);
        
        closeModal('modal-analyzer');
    } catch (err) {
        console.error(err);
        alert('Analysis failed.');
    } finally {
        loading.classList.add('hidden');
        formAnalyzer.classList.remove('hidden');
        formAnalyzer.reset();
    }
});

function displayResults(data, urls) {
    document.querySelector('.welcome-title').classList.add('hidden');
    document.querySelector('.subtitle').classList.add('hidden');
    btnOpenAnalyzer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    const cl = document.getElementById('res-classification');
    cl.innerText = `Classification: ${data.classification} Email`;
    cl.style.color = getColor(data.classification);
    
    document.getElementById('res-email-insight').innerText = data.email_insight;
    document.getElementById('res-action').innerText = data.suggested_action;
    document.getElementById('res-awareness').innerText = data.awareness_tips;
    
    const urlBox = document.getElementById('box-url-insight');
    // Case 1 vs Case 2
    if (urls && urls.trim().length > 0 && data.url_insight) {
        document.getElementById('res-url-insight').innerText = data.url_insight;
        urlBox.classList.remove('hidden');
    } else {
        urlBox.classList.add('hidden');
    }
    
    // Update global state for modals
    updateModalsWithData(data);
}

function updateModalsWithData(data) {
    // Confidence
    document.getElementById('conf-score').innerText = data.confidence;
    document.getElementById('conf-level').innerText = data.confidence_level;
    document.getElementById('conf-meaning').innerText = `The model detected patterns indicative of ${data.classification.toLowerCase()} emails.`;
    
    // Summary
    document.getElementById('sum-text').innerText = data.summary;
    document.getElementById('sum-intent').innerText = data.email_insight;
}

async function fetchDashboard() {
    try {
        const res = await fetch('/dashboard');
        const data = await res.json();
        document.getElementById('dash-total').innerText = data.total;
        document.getElementById('dash-safe').innerText = data.counts.Safe;
        document.getElementById('dash-spam').innerText = data.counts.Spam;
        document.getElementById('dash-phishing').innerText = data.counts.Phishing;
    } catch(err) { console.error(err); }
}

function getColor(classification) {
    if(classification === 'Phishing') return '#ef4444';
    if(classification === 'Spam') return '#f59e0b';
    return '#10b981';
}

function updateBackgroundState(data) {
    const col = getColor(data.classification);
    document.querySelector('.glow-1').style.background = `radial-gradient(circle, ${col} 0%, transparent 70%)`;
}

// Quiz actions
function checkAnswer(isCorrect) {
    document.getElementById('quiz-question').classList.add('hidden');
    const res = document.getElementById('quiz-result');
    res.classList.remove('hidden');
    const fb = document.getElementById('quiz-feedback');
    if(isCorrect) {
        fb.innerText = "✅ Correct!";
        fb.style.color = "#10b981";
    } else {
        fb.innerText = "❌ Incorrect.";
        fb.style.color = "#ef4444";
    }
}

function resetQuiz() {
    document.getElementById('quiz-question').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
}
