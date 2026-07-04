import smtplib
from email.mime.text import MIMEText

SENDER_EMAIL = "your_email@gmail.com"
SENDER_PASSWORD = "your_app_password"
RECEIVER_EMAIL = "security@example.com"


def send_alert(attack, confidence):
    subject = "🚨 CyberShield AI Alert"

    body = f"""
CyberShield AI detected a potential cyber attack.

Attack Type : {attack}

Confidence : {confidence}%

Immediate investigation is recommended.
"""

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg["To"] = RECEIVER_EMAIL

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(
            SENDER_EMAIL,
            RECEIVER_EMAIL,
            msg.as_string(),
        )
        server.quit()

        print("Alert email sent.")

    except Exception as e:
        print("Email Error:", e)