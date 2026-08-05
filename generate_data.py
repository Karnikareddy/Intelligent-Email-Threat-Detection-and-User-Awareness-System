import pandas as pd
import random
import os

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

safe_subjects = ["Meeting notes", "Project update", "Lunch today?", "Weekly report", "Invoice attached for review", "Hey, how are you?", "Your Amazon order", "Team building event", "Code review request", "New feature launch"]
safe_bodies = [
    "Hi team, here are the meeting notes from yesterday. Let me know if you have any questions.",
    "The project is on track for delivery next week. Thanks for your hard work.",
    "Are we still on for lunch at 12? Let me know.",
    "Please find the weekly report attached. Best regards.",
    "Hey, just checking in to see how things are going.",
    "Your recent Amazon order #12345 has been shipped and will arrive tomorrow.",
    "We are planning a team building event next month. Please vote on the location.",
    "I have submitted a pull request for the new feature. Please review it when you have time.",
    "The new feature has been launched successfully. Great job everyone!",
    "Can we reschedule our meeting to 3 PM? Thanks."
]

spam_subjects = ["You won a lottery!", "Cheap meds online", "Lose weight fast", "Enlarge your...", "Make money working from home", "Exclusive offer just for you", "Congratulations! You are selected", "Hot singles in your area", "Buy one get one free", "Clearance sale up to 90% off"]
spam_bodies = [
    "Congratulations! You have been selected to win $1,000,000. Click here to claim your prize.",
    "Buy cheap medications online without a prescription. Fast shipping. Visit our website now.",
    "Lose 20 pounds in 2 weeks with our miracle pill. Order now and get a free trial.",
    "Make $5000 a week working from home. No experience needed. Sign up today.",
    "Exclusive offer just for you! Get 50% off on all items. Use code 50OFF at checkout.",
    "You are the lucky winner of our daily draw. Click the link to claim your new iPhone.",
    "Meet hot singles in your area today. 100% free registration. Click here.",
    "Buy one get one free on all designer watches. Limited time offer. Shop now.",
    "Huge clearance sale! Up to 90% off on electronics. Don't miss out. Visit our store.",
    "Invest in our new cryptocurrency and double your money in a week. Guaranteed returns."
]

phishing_subjects = ["Urgent: Account Suspended", "Security Alert: Unauthorized Login Attempt", "Verify Your Bank Account", "Important: Update Your Password", "Action Required: Payment Failed", "Your PayPal account has been limited", "Netflix: Subscription Expired", "Microsoft 365: Password Expiry Notice", "Critical Security Update", "Verify your Apple ID"]
phishing_bodies = [
    "Dear customer, your account has been suspended due to unusual activity. Please click this link to verify your identity and restore access.",
    "We detected an unauthorized login attempt from a new device. If this wasn't you, click here to secure your account.",
    "Your bank account needs to be verified urgently to comply with new regulations. Please log in here to complete the verification.",
    "Your password will expire in 24 hours. Please click the link below to update your password and keep your account secure.",
    "Your recent payment failed. Please update your billing information immediately by clicking this link to avoid service interruption.",
    "Your PayPal account has been limited. To lift the limitation, please log in and confirm your personal information here.",
    "Your Netflix subscription has expired. Please update your payment details at [link] to continue watching your favorite shows.",
    "Your Microsoft 365 password will expire soon. Click here to keep your current password.",
    "A critical security update is required for your account. Please install it immediately by clicking the link provided.",
    "Your Apple ID has been locked for security reasons. To unlock it, please verify your identity here."
]

data = []

for _ in range(50):
    subj = random.choice(safe_subjects)
    body = random.choice(safe_bodies)
    data.append({"text": subj + " - " + body, "label": "Safe"})

for _ in range(25):
    subj = random.choice(spam_subjects)
    body = random.choice(spam_bodies)
    data.append({"text": subj + " - " + body, "label": "Spam"})

for _ in range(25):
    subj = random.choice(phishing_subjects)
    body = random.choice(phishing_bodies)
    data.append({"text": subj + " - " + body, "label": "Phishing"})

random.shuffle(data)

df = pd.DataFrame(data)
df.to_csv('data/emails.csv', index=False)
print('Generated data/emails.csv with 100 rows.')
