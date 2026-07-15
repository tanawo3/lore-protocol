import pytest
import os
import sys

# Add contracts dir to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "contracts")))

import json

def test_deployment_local(direct_vm, direct_deploy, direct_alice, direct_bob):
    # 1. End-to-end Build & Deployment
    contract = direct_deploy("contracts/LoreProtocol.py")
    direct_vm.sender = direct_alice
    direct_vm.value = 1000  # Send 1000 ATTO for collateral
    
    # 2. Submit Proposal with an external URL to bypass automatic rejection
    lore_text = "This is a valid lore entry. https://en.wikipedia.org/wiki/Lore"
    contract.submit_proposal("prop_1", direct_bob, 500, lore_text)
    
    # Verify the proposal is pending
    proposals_json = contract.fetch_all_proposals()
    proposals_dict = json.loads(proposals_json)
    assert proposals_dict["prop_1"]["status"] == "PENDING"
    
    # 3. Mock Web & LLM for the Core Evaluation Closure
    direct_vm.mock_web(
        r".*wikipedia\.org.*",
        {"status": 200, "body": "This is an external canon page about Lore."}
    )
    
    direct_vm.mock_llm(
        r".*",
        json.dumps({
            "verdict": "APPROVED",
            "risk_score_bps": 500,
            "summary": "Approved based on valid canon data."
        })
    )
    
    # 4. Evaluate the Proposal
    contract.evaluate_proposal("prop_1")
    
    # 5. Verify the Proposal was Approved and values changed properly
    proposals_json = contract.fetch_all_proposals()
    proposals_dict = json.loads(proposals_json)
    assert proposals_dict["prop_1"]["status"] == "APPROVED"
    assert "Approved based on valid canon data." in proposals_dict["prop_1"]["ai_reasoning"]
