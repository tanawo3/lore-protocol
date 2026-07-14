import os
import re

directory = r"C:\Users\omarb\Desktop\genlayer\pending_projects\lore-protocol\src"

replacements = {
    "Lending Engine": "World Builder Engine",
    "decentralized loan proposals": "community lore entries",
    "Evaluating Loan": "Evaluating Lore",
    "Submit Loan": "Submit Lore",
    "Borrower Address": "Creator Address",
    "Requested Capital": "Reputation Points",
    "Loan Dashboard": "Lore Dashboard",
    "Ai Underwriter": "Game Master AI",
    "Underwriter": "Game Master",
    "AI Risk Assessment": "Game Master Review",
    "AI Risk Analysis": "Game Master Analysis",
    "Pitch": "Lore Entry",
    "Loan Purpose": "Lore Narrative",
    "Loan Amount": "Reputation Amount",
    "Credit Profile": "Creator Profile",
    "borrower": "creator",
    "requested_amount": "reputation_points",
    "text_proposal": "lore_entry",
    "GenLend": "Lore Protocol",
    "Loan Parameters": "Lore Parameters",
    "Loan Status": "Entry Status",
    "loan requests": "lore entries",
    "loan": "lore",
    "Loan": "Lore",
    "Loans": "Lore Entries",
    "loans": "lore entries",
    "LendingProtocol.py": "LoreProtocol.py"
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for pattern, repl in replacements.items():
        new_content = new_content.replace(pattern, repl)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.html', '.css')):
            process_file(os.path.join(root, file))
