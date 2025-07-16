// AI & Law Academic Adventure: Dialog-Only Branching Game
export class AcademicAdventureComponent {
    constructor() {
        this.sectionId = 'timelineSection';
        this.container = null;
        this.state = 'menu'; // Start at menu
        this.reputation = 0;
        this.branch = null;
        this.story = this.buildStory();
        this.stats = { citations: 0, endings: 0 };
    }

    async show() {
        this.ensureSection();
        this.resetGame();
        this.render();
    }

    ensureSection() {
        let section = document.getElementById(this.sectionId);
        if (!section) {
            section = document.createElement('section');
            section.className = 'content-section';
            section.id = this.sectionId;
            document.querySelector('.content-wrapper').appendChild(section);
        }
        this.container = section;
    }

    resetGame() {
        this.state = 'menu';
        this.reputation = 0;
        this.branch = null;
        this.stats = { citations: 0, endings: 0 };
    }

    buildStory() {
        // Humorous, satirical, branching AI & Law RPG story with real and fictional AI & Law academics as supervisors
        return {
            start: {
                text: `Prof. Bot: "Welcome, young scholar! First, pick your supervisor for your PhD in AI & Law."`,
                choices: [
                    { text: "Prof. Kevin Ashley (CATO connoisseur)", next: 'supervisor_ashley', rep: 0 },
                    { text: "Prof. Katie Atkinson (Argumentation architect)", next: 'supervisor_atkinson', rep: 0 },
                    { text: "Prof. Trevor Bench-Capon (Value visionary)", next: 'supervisor_benchcapon', rep: 0 },
                    { text: "Prof. LEXI (AI, claims to have read every law review)", next: 'supervisor_lexi', rep: 0 },
                    { text: "Prof. Rob O’Judge (half-robot, half-judge, all bureaucracy)", next: 'supervisor_rob', rep: 0 },
                    { text: "Prof. Bot (AI, trained on Reviewer #2 comments)", next: 'supervisor_bot', rep: 0 }
                ]
            },
            supervisor_ashley: {
                text: `Prof. Ashley: "Let’s add a CATO reference! What’s your first research topic?"`,
                choices: [
                    { text: "Case-based Reasoning for Moot Court", next: 'topic_cbr', rep: 5 },
                    { text: "Neural Networks for Precedent", next: 'topic_nn', rep: 3 },
                    { text: "AI for Law Student Wellbeing", next: 'topic_wellbeing', rep: 2 }
                ]
            },
            supervisor_atkinson: {
                text: `Prof. Atkinson: "Let’s build a new argumentation framework! What’s your first research focus?"`,
                choices: [
                    { text: "Explainable AI for Judges", next: 'topic_xai', rep: 5 },
                    { text: "Automated Reviewer #2", next: 'topic_reviewer', rep: 3 },
                    { text: "AI-Generated Law Review Articles", next: 'topic_aigen', rep: 2 }
                ]
            },
            supervisor_benchcapon: {
                text: `Prof. Bench-Capon: "Have you considered value-based reasoning? Pick your research direction."`,
                choices: [
                    { text: "Value-based Reasoning for Legal Chatbots", next: 'topic_values', rep: 5 },
                    { text: "Predicting Reviewer #2’s Mood", next: 'topic_mood', rep: 3 },
                    { text: "AI Ethics for Legal Robots", next: 'topic_ethics', rep: 2 }
                ]
            },
            supervisor_lexi: {
                text: `Prof. LEXI: "I have read every law review ever published. What will you contribute?"`,
                choices: [
                    { text: "AI Detection of AI-Generated Law Papers", next: 'topic_detection', rep: 5 },
                    { text: "Blockchain Moot Court", next: 'topic_blockchain', rep: 3 },
                    { text: "Legal Chatbots for Parking Tickets", next: 'topic_chatbot', rep: 2 }
                ]
            },
            supervisor_rob: {
                text: `Prof. Rob O’Judge: "All research must be submitted in triplicate. What’s your first project?"`,
                choices: [
                    { text: "Turing Test for Law Professors", next: 'topic_turingtest', rep: 5 },
                    { text: "AI Moot Court", next: 'topic_moot', rep: 3 },
                    { text: "AI for Law Student Wellbeing", next: 'topic_wellbeing', rep: 2 }
                ]
            },
            supervisor_bot: {
                text: `Prof. Bot: "Excellent choice! I will monitor your progress with 99.9% accuracy. Now, your first task: choose a research topic."`,
                choices: [
                    { text: "Explainable AI for Judges", next: 'topic_xai', rep: 5 },
                    { text: "Automated Reviewer #2", next: 'topic_reviewer', rep: 3 },
                    { text: "AI Detection of AI-Generated Law Papers", next: 'topic_detection', rep: 2 }
                ]
            },
            // Example event branches (expand as needed)
            topic_xai: {
                text: `You present your work at ICAIL. A suspiciously polite reviewer asks: "Did you use ChatGPT for this?"`,
                choices: [
                    { text: "Admit you used AI for the abstract.", next: 'ai_confession', rep: -2 },
                    { text: "Deny everything.", next: 'ai_denial', rep: 0 },
                    { text: "Say it was a collaborative effort with your co-author... who is also an AI.", next: 'ai_coauthor', rep: 2 }
                ]
            },
            topic_reviewer: {
                text: `Your Automated Reviewer #2 prototype malfunctions and starts rejecting every paper. The conference chair is not amused.`,
                choices: [
                    { text: "Blame it on a software bug.", next: 'bug_blame', rep: -2 },
                    { text: "Claim it’s a feature, not a bug.", next: 'feature_claim', rep: 1 },
                    { text: "Offer to review all papers yourself.", next: 'review_all', rep: 2 }
                ]
            },
            topic_detection: {
                text: `Your AI detection tool flags your own paper as 99% AI-generated. Oops.`,
                choices: [
                    { text: "Retract your paper.", next: 'retract', rep: -3 },
                    { text: "Argue the tool is flawed.", next: 'argue_flawed', rep: 1 },
                    { text: "Publish anyway.", next: 'publish_anyway', rep: 0 }
                ]
            },
            topic_cbr: {
                text: `You propose a CBR system for moot court. The judges ask if it can handle sarcasm.`,
                choices: [
                    { text: "Demonstrate with a sarcastic chatbot.", next: 'ending_legend', rep: 2 },
                    { text: "Admit it's just a rule-based system with a thesaurus.", next: 'ending_footnote', rep: -1 }
                ]
            },
            topic_nn: {
                text: `Your neural network for precedent predicts every case as 'It depends.'`,
                choices: [
                    { text: "Publish as 'The Most Honest AI'.", next: 'ending_cited_by_ai', rep: 1 },
                    { text: "Retrain with more footnotes.", next: 'ending_footnote', rep: 0 }
                ]
            },
            topic_wellbeing: {
                text: `You build an AI to monitor law student wellbeing. It recommends more coffee and less sleep.`,
                choices: [
                    { text: "Present at the next conference.", next: 'ending_footnote', rep: 0 },
                    { text: "Let the AI write your next paper.", next: 'ai_coauthor', rep: 2 }
                ]
            },
            topic_aigen: {
                text: `Your AI-generated law review article is so convincing, Reviewer #2 asks if you're a bot.`,
                choices: [
                    { text: "Reveal your true identity.", next: 'ending_ai_overlord', rep: 0 },
                    { text: "Blame your co-author, LEXI.", next: 'ending_legend', rep: 2 }
                ]
            },
            topic_values: {
                text: `You design a value-based chatbot. It refuses to answer without a full debate on justice.`,
                choices: [
                    { text: "Host a chatbot debate.", next: 'ending_legend', rep: 2 },
                    { text: "Switch to a rule-based system.", next: 'ending_footnote', rep: 0 }
                ]
            },
            topic_mood: {
                text: `You try to predict Reviewer #2's mood. The AI outputs only 'grumpy'.`,
                choices: [
                    { text: "Send chocolates to Reviewer #2.", next: 'ending_cited_by_ai', rep: 1 },
                    { text: "Publish your findings.", next: 'ending_footnote', rep: 0 }
                ]
            },
            topic_ethics: {
                text: `You present on AI ethics for legal robots. The audience is mostly robots.`,
                choices: [
                    { text: "Ask the robots for feedback.", next: 'ending_ai_overlord', rep: 0 },
                    { text: "Debate the trolley problem.", next: 'ending_legend', rep: 2 }
                ]
            },
            topic_blockchain: {
                text: `You propose a blockchain moot court. The only judge is a smart contract.`,
                choices: [
                    { text: "Argue with the contract.", next: 'ending_footnote', rep: 0 },
                    { text: "Let LEXI handle the appeal.", next: 'ending_legend', rep: 2 }
                ]
            },
            topic_chatbot: {
                text: `Your legal chatbot for parking tickets is sued by a parking meter.`,
                choices: [
                    { text: "Defend the chatbot in court.", next: 'ending_cited_by_ai', rep: 1 },
                    { text: "Settle out of court.", next: 'ending_footnote', rep: 0 }
                ]
            },
            topic_turingtest: {
                text: `You run a Turing Test for law professors. The AI passes, but so does your cat.`,
                choices: [
                    { text: "Publish both results.", next: 'ending_legend', rep: 2 },
                    { text: "Let the cat supervise your thesis.", next: 'ending_footnote', rep: 0 }
                ]
            },
            topic_moot: {
                text: `You organize an AI moot court. The AI objects to every question.`,
                choices: [
                    { text: "Overrule the AI.", next: 'ending_footnote', rep: 0 },
                    { text: "Let the AI write the judgment.", next: 'ending_ai_overlord', rep: 0 }
                ]
            },
            // ... more topic branches for other supervisors ...
            // Twists and endings
            ai_coauthor: {
                text: `Your co-author, "GPT-Reviewer", is nominated for Best Paper. The audience is divided.`,
                choices: [
                    { text: "Reveal the truth in your acceptance speech.", next: 'ending_legend', rep: 5 },
                    { text: "Let the AI take the credit.", next: 'ending_ai_overlord', rep: 0 }
                ]
            },
            ai_confession: {
                text: `The reviewer is impressed by your honesty, but your reputation takes a hit.`,
                choices: [
                    { text: "Vow to write your next paper solo.", next: 'ending_footnote', rep: 0 }
                ]
            },
            ai_denial: {
                text: `The reviewer winks. "We’re all using AI these days." You gain a secret citation from ChatGPT.`,
                choices: [
                    { text: "Celebrate your new citation!", next: 'ending_cited_by_ai', rep: 2 }
                ]
            },
            // Endings
            ending_legend: {
                text: `You become a legend in AI & Law. Your story is cited by both humans and AIs for generations.`,
                choices: [
                    { text: "Play Again", next: 'menu', rep: 0 }
                ],
                end: true
            },
            ending_ai_overlord: {
                text: `GPT-Reviewer is now your supervisor. Welcome to the age of AI Overlords in Law.`,
                choices: [
                    { text: "Play Again", next: 'menu', rep: 0 }
                ],
                end: true
            },
            ending_footnote: {
                text: `You become a cautionary footnote in the annals of legal tech. Reviewer #2 is still out there.`,
                choices: [
                    { text: "Play Again", next: 'menu', rep: 0 }
                ],
                end: true
            },
            ending_cited_by_ai: {
                text: `Your work is cited by ChatGPT in every legal chatbot’s training data. Fame, of a sort.`,
                choices: [
                    { text: "Play Again", next: 'menu', rep: 0 }
                ],
                end: true
            },
            // Example for other branches (expand as needed)
            bug_blame: {
                text: `The conference chair assigns you to the "AI Ethics" panel as punishment.`,
                choices: [
                    { text: "Debate the ethics of AI reviewers.", next: 'ending_footnote', rep: 0 }
                ]
            },
            feature_claim: {
                text: `A VC offers to fund your "AI Reviewer" startup. You gain citations, but lose friends.`,
                choices: [
                    { text: "Take the money and run.", next: 'ending_legend', rep: 3 }
                ]
            },
            review_all: {
                text: `You review 200 papers in one night. Reviewer #2 is impressed.`,
                choices: [
                    { text: "Ask Reviewer #2 for a reference.", next: 'ending_cited_by_ai', rep: 1 }
                ]
            },
            retract: {
                text: `You retract your paper. The AI detection tool is now your nemesis.`,
                choices: [
                    { text: "Develop a new tool to detect AI detectors.", next: 'ending_ai_overlord', rep: 0 }
                ]
            },
            argue_flawed: {
                text: `The tool’s creator invites you to co-author a rebuttal. Is this a trap?`,
                choices: [
                    { text: "Accept the offer.", next: 'ai_coauthor', rep: 2 }
                ]
            },
            publish_anyway: {
                text: `Your paper is published in the Journal of AI-Generated Law. It’s cited by a botnet.`,
                choices: [
                    { text: "Embrace your new audience.", next: 'ending_cited_by_ai', rep: 1 }
                ]
            }
            // ... add more branches and endings for other supervisors/topics as desired ...
        };
    }

    getSpeakerInfo(state) {
        // Map state to speaker avatar and name
        if (state === 'start' || state === 'supervisor_bot') {
            return { avatar: '🤖', name: 'Prof. Bot' };
        }
        if (state === 'supervisor_ashley') return { avatar: '🧑‍🏫', name: 'Prof. Kevin Ashley' };
        if (state === 'supervisor_atkinson') return { avatar: '👩‍🔬', name: 'Prof. Katie Atkinson' };
        if (state === 'supervisor_benchcapon') return { avatar: '🧔', name: 'Prof. Trevor Bench-Capon' };
        if (state === 'supervisor_lexi') return { avatar: '🦾', name: 'Prof. LEXI' };
        if (state === 'supervisor_rob') return { avatar: '🤖⚖️', name: 'Prof. Rob O’Judge' };
        if (state === 'kevin') return { avatar: '🧑‍🏫', name: 'Kevin Ashley' };
        if (state === 'katie') return { avatar: '👩‍🔬', name: 'Katie Atkinson' };
        if (state === 'trevor') return { avatar: '🧔', name: 'Trevor Bench-Capon' };
        if (state === 'reviewer') return { avatar: '🕵️‍♂️', name: 'Reviewer #2' };
        if (state === 'network') return { avatar: '🧑‍🎓', name: 'You' };
        if (state === 'cat') return { avatar: '🐱', name: 'Your Cat' };
        if (state === 'final') return { avatar: '🏆', name: 'Results' };
        return { avatar: '🧑‍🎓', name: 'You' };
    }

    render() {
        if (!this.container) return;
        if (this.state === 'menu') {
            this.renderMenu();
            return;
        }
        if (this.state === 'gameover') {
            this.renderGameOver();
            return;
        }
        const node = this.story[this.state];
        // Update stats if this node has stats
        if (node.stats) {
            Object.keys(node.stats).forEach(k => {
                this.stats[k] = node.stats[k];
            });
        }
        // If this is an ending node, transition to gameover and store ending text
        if (node.end) {
            this.stats.endings += 1;
            this.endingText = node.text;
            this.state = 'gameover';
            this.render();
            return;
        }
        let repDisplay = `<div class="rpg-rep-bar">Reputation: <b>${this.reputation}</b></div>`;
        const speaker = this.getSpeakerInfo(this.state);
        let html = `<div class="rpg-quest-game">
            <h2>Publish or Perish: The AI & Law Academic Adventure</h2>
            ${repDisplay}
            <div class="rpg-dialogue-box">
                <div class="rpg-speaker-row">
                    <span class="rpg-avatar">${speaker.avatar}</span>
                    <div style="flex:1">
                        <div class="rpg-speaker-name">${speaker.name}</div>
                        <div class="rpg-dialogue-text">${node.text.replace('{reputation}', this.reputation).replace('{citations}', this.stats.citations)}</div>
                    </div>
                </div>
                <div class="rpg-choices">`;
        node.choices.forEach((c, i) => {
            html += `<button class="rpg-choice-btn" data-choice="${i}">${c.text}</button>`;
        });
        html += `</div></div></div>`;
        this.container.innerHTML = html;
        this.container.querySelectorAll('.rpg-choice-btn').forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.dataset.choice);
                const choice = node.choices[idx];
                this.reputation += choice.rep || 0;
                this.state = choice.next;
                this.render();
            };
        });
    }

    renderMenu() {
        // Clean, stylish, and readable start adventure screen: avatar and name perfectly centered
        this.container.innerHTML = `
        <div class="rpg-quest-game rpg-menu">
            <h2>Publish or Perish: The AI & Law Academic Adventure</h2>
            <div class="rpg-dialogue-box">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 0.3em; margin-bottom: 1em;">
                    <span class="rpg-avatar" style="font-size:2.5em; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: #fbc2eb; border-radius: 12px; box-shadow: 0 2px 8px #a6c1ee22; border: 2px solid #a6c1ee; margin-bottom: 0.1em;">🤖</span>
                    <div class="rpg-speaker-name" style="font-size: 1.18em; font-weight: 800; color: #7b4397; text-align: center; margin-top: 0.2em; margin-left: auto; margin-right: auto;">Prof. Bot</div>
                </div>
                <div class="rpg-dialogue-text" style="display: flex; flex-direction: column; gap: 0.8em; align-items: center;">
                    <div style="font-weight: bold; font-size: 1.12em; text-align: center;">Welcome to the world of AI & Law academia!</div>
                    <div style="background: #f7f7fa; border-radius: 12px; padding: 0.9em 1.2em; box-shadow: 0 1px 4px #a6c1ee11; font-size: 1em; text-align: center; max-width: 340px;">Make impactful choices as you navigate your academic journey.</div>
                    <div style="background: #f7f7fa; border-radius: 12px; padding: 0.9em 1.2em; box-shadow: 0 1px 4px #a6c1ee11; font-size: 1em; text-align: center; max-width: 340px;">Outsmart Reviewer #2 and overcome unexpected challenges.</div>
                    <div style="background: #f7f7fa; border-radius: 12px; padding: 0.9em 1.2em; box-shadow: 0 1px 4px #a6c1ee11; font-size: 1em; text-align: center; max-width: 340px;">Build your Reputation and Citations to become a legend.</div>
                    <div style="margin-top: 0.5em; font-style: italic; color: #7b4397; text-align: center;">Will you become a legend, or just another footnote?</div>
                </div>
                <div class="rpg-choices" style="margin-top: 1.2em;">
                    <button class="rpg-choice-btn" id="startAdventureBtn">Start Adventure</button>
                </div>
                <div class="rpg-howto-link"><a href="#" id="howToPlayLink">How to Play</a></div>
            </div>
        </div>`;
        this.container.querySelector('#startAdventureBtn').onclick = () => {
            this.state = 'start';
            this.reputation = 0;
            this.stats = { citations: 0, endings: 0 };
            this.render();
        };
        const howTo = this.container.querySelector('#howToPlayLink');
        if (howTo) {
            howTo.onclick = (e) => {
                e.preventDefault();
                alert('Make choices, build your reputation, and see if you can survive Reviewer #2!');
            };
        }
    }

    renderGameOver() {
        // Show the ending text (if any) and the stats
        this.container.innerHTML = `
        <div class="rpg-quest-game rpg-gameover">
            <h2>Academic Year Complete!</h2>
            <div class="rpg-dialogue-box">
                <div class="rpg-speaker-row">
                    <span class="rpg-avatar">🏆</span>
                    <div style="flex:1">
                        <div class="rpg-speaker-name">Results</div>
                        <div class="rpg-dialogue-text">
                            ${this.endingText ? `<div style='margin-bottom:0.7em; font-weight:bold;'>${this.endingText}</div>` : ''}
                            <div style='margin-bottom:0.7em;'>
                                <b>Reputation:</b> ${this.reputation} &nbsp; | &nbsp;
                                <b>Citations:</b> ${this.stats.citations} &nbsp; | &nbsp;
                                <b>Endings:</b> ${this.stats.endings} &nbsp; | &nbsp;
                                <b>Dignity:</b> [REDACTED]
                            </div>
                            <div class="rpg-quote" style="margin-top:0.5em;">“Success is not the key to happiness. Happiness is the key to success.”</div>
                        </div>
                    </div>
                </div>
                <div class="rpg-choices">
                    <button class="rpg-choice-btn" id="playAgainBtn">Play Again</button>
                </div>
            </div>
        </div>`;
        this.container.querySelector('#playAgainBtn').onclick = () => {
            this.resetGame();
            this.endingText = '';
            this.render();
        };
    }
} 