// components/learn.js

// --- Modern, Minimal Learn UI ---

export class LearnComponent {
    constructor() {
        // Topics and questions (keep your questionTemplates as before)
        this.topics = [
            { id: 'icail', title: 'ICAIL Conference', icon: '🏛️', description: 'Explore the premier international conference on Artificial Intelligence and Law.', color: '#4CAF50', lessonCount: 3, questionsPerLesson: 5 },
            { id: 'jurix', title: 'JURIX Conference', icon: '⚖️', description: 'Explore the European conference on Legal Knowledge and Information Systems.', color: '#2196F3', lessonCount: 3, questionsPerLesson: 5 },
            { id: 'journal', title: 'Journal of AI and Law', icon: '📚', description: 'Discover the leading academic journal in the field of Artificial Intelligence and Law.', color: '#FF9800', lessonCount: 3, questionsPerLesson: 5 },
            { id: 'history', title: 'History of AI & Law', icon: '📜', description: 'Trace the evolution of AI & Law from early expert systems to modern applications.', color: '#9C27B0', lessonCount: 3, questionsPerLesson: 5 },
            { id: 'academics', title: 'AI and Law Academics', icon: '🎓', description: 'Learn about key academics and their groundbreaking work in the field of AI & Law.', color: '#E91E63', lessonCount: 3, questionsPerLesson: 5 },
            { id: 'cbr', title: 'Case-Based Reasoning', icon: '🧠', description: 'Learn about case-based reasoning systems and their applications in legal AI.', color: '#795548', lessonCount: 3, questionsPerLesson: 5 }
        ];
        this.questionTemplates = {
            // ICAIL Module - 3 lessons with ascending difficulty
            'icail': [
                // Lesson 0: Beginner - Basic facts about ICAIL
                {
                    template: 'What does ICAIL stand for?',
                    answers: [
                        { text: 'International Conference on Artificial Intelligence and Law', correct: true, explanation: 'ICAIL is the premier international conference for AI & Law research.' },
                        { text: 'International Committee on AI and Legal Systems', correct: false, explanation: 'This is not the correct expansion of ICAIL.' },
                        { text: 'Institute for Computer-Aided Legal Research', correct: false, explanation: 'This is not what ICAIL stands for.' },
                        { text: 'International Association of Legal Informatics', correct: false, explanation: 'This is not the correct expansion of ICAIL.' }
                    ]
                },
                {
                    template: 'When was the first ICAIL conference held?',
                    answers: [
                        { text: '1987', correct: true, explanation: 'The first ICAIL conference was held in 1987, establishing it as the premier venue for AI & Law research.' },
                        { text: '1985', correct: false, explanation: 'ICAIL was not established in 1985.' },
                        { text: '1990', correct: false, explanation: 'ICAIL was already established by 1990.' },
                        { text: '1983', correct: false, explanation: 'ICAIL was not established in 1983.' }
                    ]
                },
                {
                    template: 'Where was the first ICAIL conference held?',
                    answers: [
                        { text: 'Boston, Massachusetts', correct: true, explanation: 'The first ICAIL conference was held in Boston, Massachusetts, USA.' },
                        { text: 'London, England', correct: false, explanation: 'The first ICAIL was not held in London.' },
                        { text: 'Tokyo, Japan', correct: false, explanation: 'The first ICAIL was not held in Tokyo.' },
                        { text: 'Paris, France', correct: false, explanation: 'The first ICAIL was not held in Paris.' }
                    ]
                },
                {
                    template: 'What is the frequency of ICAIL conferences?',
                    answers: [
                        { text: 'Biennial (every 2 years)', correct: true, explanation: 'ICAIL conferences are held biennially, every two years.' },
                        { text: 'Annual', correct: false, explanation: 'ICAIL is not held annually.' },
                        { text: 'Every 3 years', correct: false, explanation: 'ICAIL is held more frequently than every 3 years.' },
                        { text: 'Every 4 years', correct: false, explanation: 'ICAIL is held more frequently than every 4 years.' }
                    ]
                },
                {
                    template: 'Which organization sponsors ICAIL?',
                    answers: [
                        { text: 'International Association for Artificial Intelligence and Law (IAAIL)', correct: true, explanation: 'ICAIL is sponsored by the International Association for Artificial Intelligence and Law (IAAIL).' },
                        { text: 'ACM', correct: false, explanation: 'ACM does not sponsor ICAIL.' },
                        { text: 'IEEE', correct: false, explanation: 'IEEE does not sponsor ICAIL.' },
                        { text: 'AAAI', correct: false, explanation: 'AAAI does not sponsor ICAIL.' }
                    ]
                }
            ],
            'icail-lesson-1': [
                // Lesson 1: Intermediate - Research areas and impact
                {
                    template: 'What is the Donald H. Berman Award for Best Paper given for at ICAIL?',
                    answers: [
                        { text: 'Outstanding research contribution to AI & Law', correct: true, explanation: 'The Donald H. Berman Award recognizes the best paper presented at ICAIL for outstanding research contribution to the field.' },
                        { text: 'Best student presentation', correct: false, explanation: 'This is not what the Berman Award is for.' },
                        { text: 'Most innovative application', correct: false, explanation: 'This is not what the Berman Award is for.' },
                        { text: 'Best poster presentation', correct: false, explanation: 'This is not what the Berman Award is for.' }
                    ]
                },
                {
                    template: 'What type of research is typically presented at ICAIL?',
                    answers: [
                        { text: 'Both theoretical and applied AI & Law research', correct: true, explanation: 'ICAIL presents both theoretical foundations and practical applications of AI in legal contexts.' },
                        { text: 'Only theoretical research', correct: false, explanation: 'ICAIL covers both theoretical and applied research.' },
                        { text: 'Only industry applications', correct: false, explanation: 'ICAIL covers academic research, not just industry applications.' },
                        { text: 'Only legal theory', correct: false, explanation: 'ICAIL focuses on AI & Law, not just legal theory.' }
                    ]
                },
                {
                    template: 'What is the typical format of ICAIL conferences?',
                    answers: [
                        { text: 'Paper presentations, posters, and workshops', correct: true, explanation: 'ICAIL conferences typically include paper presentations, poster sessions, and workshops covering various aspects of AI & Law.' },
                        { text: 'Only paper presentations', correct: false, explanation: 'ICAIL includes more than just paper presentations.' },
                        { text: 'Only workshops', correct: false, explanation: 'ICAIL includes more than just workshops.' },
                        { text: 'Only poster sessions', correct: false, explanation: 'ICAIL includes more than just poster sessions.' }
                    ]
                },
                {
                    template: 'What is the impact of ICAIL on the AI & Law field?',
                    answers: [
                        { text: 'Shapes research directions and standards', correct: true, explanation: 'ICAIL has a significant impact on shaping research directions and establishing standards in the AI & Law field.' },
                        { text: 'No significant impact', correct: false, explanation: 'ICAIL has significant impact on the field.' },
                        { text: 'Only academic impact', correct: false, explanation: 'ICAIL has broader impact than just academic.' },
                        { text: 'Only industry impact', correct: false, explanation: 'ICAIL has broader impact than just industry.' }
                    ]
                },
                {
                    template: 'What is the typical attendance at ICAIL conferences?',
                    answers: [
                        { text: 'International researchers and practitioners', correct: true, explanation: 'ICAIL typically attracts international researchers and practitioners from academia, industry, and government.' },
                        { text: 'Only academics', correct: false, explanation: 'ICAIL attracts more than just academics.' },
                        { text: 'Only industry professionals', correct: false, explanation: 'ICAIL attracts more than just industry professionals.' },
                        { text: 'Only students', correct: false, explanation: 'ICAIL attracts more than just students.' }
                    ]
                }
            ],
            'icail-lesson-2': [
                // Lesson 2: Advanced - Modern trends and future directions
                {
                    template: 'Which of these research areas has become increasingly prominent at recent ICAIL conferences?',
                    answers: [
                        { text: 'Machine Learning and Legal AI', correct: true, explanation: 'Machine learning applications in legal AI have become increasingly prominent at recent ICAIL conferences, reflecting broader AI trends.' },
                        { text: 'Traditional rule-based systems', correct: false, explanation: 'While still relevant, rule-based systems are not the most prominent recent trend.' },
                        { text: 'Hardware implementations', correct: false, explanation: 'Hardware implementations are not a major focus at ICAIL.' },
                        { text: 'Legal database design', correct: false, explanation: 'While important, this is not the most prominent recent trend.' }
                    ]
                },
                {
                    template: 'What is the relationship between ICAIL and other AI conferences?',
                    answers: [
                        { text: 'ICAIL alternates with other major AI conferences', correct: true, explanation: 'ICAIL is held biennially and alternates with other major AI conferences to avoid scheduling conflicts and maximize participation.' },
                        { text: 'ICAIL competes directly with other AI conferences', correct: false, explanation: 'ICAIL collaborates rather than competes with other conferences.' },
                        { text: 'ICAIL is a satellite of AAAI', correct: false, explanation: 'ICAIL is independent, not a satellite conference.' },
                        { text: 'ICAIL is held simultaneously with IJCAI', correct: false, explanation: 'ICAIL is not held simultaneously with IJCAI.' }
                    ]
                },
                {
                    template: 'What is a current challenge discussed at ICAIL?',
                    answers: [
                        { text: 'Ensuring AI systems are fair and transparent', correct: true, explanation: 'Ensuring AI systems are fair, transparent, and accountable is a major current challenge discussed at ICAIL conferences.' },
                        { text: 'Replacing human lawyers with AI', correct: false, explanation: 'This is not a current goal discussed at ICAIL.' },
                        { text: 'Eliminating legal regulations', correct: false, explanation: 'This is not a current goal discussed at ICAIL.' },
                        { text: 'Standardizing all legal systems', correct: false, explanation: 'This is not a current goal discussed at ICAIL.' }
                    ]
                },
                {
                    template: 'What is the future direction of ICAIL research?',
                    answers: [
                        { text: 'Integration of multiple AI techniques for legal applications', correct: true, explanation: 'The future direction involves integrating multiple AI techniques (ML, NLP, reasoning) for comprehensive legal applications.' },
                        { text: 'Focus on single AI techniques only', correct: false, explanation: 'The future involves integration, not single techniques.' },
                        { text: 'Replacement of AI with traditional methods', correct: false, explanation: 'This is not the future direction.' },
                        { text: 'Focus on hardware only', correct: false, explanation: 'The future involves software and applications, not just hardware.' }
                    ]
                },
                {
                    template: 'What is the role of industry participation at ICAIL?',
                    answers: [
                        { text: 'Bridging research and practical applications', correct: true, explanation: 'Industry participation at ICAIL helps bridge academic research with practical applications in legal technology.' },
                        { text: 'Only academic presentations', correct: false, explanation: 'ICAIL includes more than just academic presentations.' },
                        { text: 'Only research funding', correct: false, explanation: 'Industry participation involves more than just funding.' },
                        { text: 'Only student recruitment', correct: false, explanation: 'Industry participation involves more than just recruitment.' }
                    ]
                }
            ],
            'jurix': [
                // Lesson 0: Beginner - Basic facts about JURIX
                {
                    template: 'What does JURIX stand for?',
                    answers: [
                        { text: 'Legal Knowledge and Information Systems', correct: true, explanation: 'JURIX focuses on legal knowledge and information systems research.' },
                        { text: 'Judicial Research and Information Exchange', correct: false, explanation: 'This is not the correct expansion of JURIX.' },
                        { text: 'Justice and Legal Informatics', correct: false, explanation: 'This is not what JURIX stands for.' },
                        { text: 'Legal Reasoning and Information Systems', correct: false, explanation: 'This is not the correct expansion of JURIX.' }
                    ]
                },
                {
                    template: 'When was JURIX established?',
                    answers: [
                        { text: '1988', correct: true, explanation: 'JURIX was established in 1988 as the European conference on Legal Knowledge and Information Systems.' },
                        { text: '1986', correct: false, explanation: 'JURIX was not established in 1986.' },
                        { text: '1990', correct: false, explanation: 'JURIX was already established by 1990.' },
                        { text: '1985', correct: false, explanation: 'JURIX was not established in 1985.' }
                    ]
                },
                {
                    template: 'How often is JURIX held?',
                    answers: [
                        { text: 'Annually', correct: true, explanation: 'JURIX is held annually, unlike ICAIL which is biennial.' },
                        { text: 'Biennially', correct: false, explanation: 'JURIX is held more frequently than biennially.' },
                        { text: 'Every 3 years', correct: false, explanation: 'JURIX is held more frequently than every 3 years.' },
                        { text: 'Monthly', correct: false, explanation: 'JURIX is not held monthly.' }
                    ]
                },
                {
                    template: 'What is the primary focus of JURIX?',
                    answers: [
                        { text: 'European legal systems and AI', correct: true, explanation: 'JURIX serves as the primary forum for the European AI & Law research community.' },
                        { text: 'Global AI applications', correct: false, explanation: 'JURIX has a specific European focus.' },
                        { text: 'Legal practice only', correct: false, explanation: 'JURIX includes both research and practice.' },
                        { text: 'Government policy', correct: false, explanation: 'JURIX is not primarily focused on government policy.' }
                    ]
                },
                {
                    template: 'Which community does JURIX primarily serve?',
                    answers: [
                        { text: 'European AI & Law researchers', correct: true, explanation: 'JURIX is the primary forum for the European AI & Law research community.' },
                        { text: 'Global practitioners', correct: false, explanation: 'While practitioners attend, JURIX has a European research focus.' },
                        { text: 'Government officials', correct: false, explanation: 'JURIX is not primarily for government officials.' },
                        { text: 'Industry professionals only', correct: false, explanation: 'JURIX serves a broader community than just industry.' }
                    ]
                }
            ],
            'jurix-lesson-1': [
                // Lesson 1: Intermediate - European legal systems and community
                {
                    template: 'What is the typical location pattern for JURIX conferences?',
                    answers: [
                        { text: 'Rotates between different European countries', correct: true, explanation: 'JURIX rotates between different European countries, reflecting its pan-European nature and commitment to the European AI & Law community.' },
                        { text: 'Always held in the Netherlands', correct: false, explanation: 'JURIX is not always held in the Netherlands.' },
                        { text: 'Always held in the UK', correct: false, explanation: 'JURIX is not always held in the UK.' },
                        { text: 'Always held in Germany', correct: false, explanation: 'JURIX is not always held in Germany.' }
                    ]
                },
                {
                    template: 'What type of legal systems does JURIX primarily focus on?',
                    answers: [
                        { text: 'Civil law systems common in Europe', correct: true, explanation: 'JURIX focuses on civil law systems that are common in European countries, distinguishing it from conferences focused on common law systems.' },
                        { text: 'Common law systems only', correct: false, explanation: 'JURIX focuses on civil law systems, not common law.' },
                        { text: 'Religious law systems', correct: false, explanation: 'JURIX does not focus on religious law systems.' },
                        { text: 'International law only', correct: false, explanation: 'JURIX focuses on domestic civil law systems, not just international law.' }
                    ]
                },
                {
                    template: 'What is the relationship between JURIX and ICAIL?',
                    answers: [
                        { text: 'Complementary conferences with different focuses', correct: true, explanation: 'JURIX and ICAIL are complementary conferences - JURIX focuses on European legal systems while ICAIL has a more global perspective.' },
                        { text: 'JURIX is a regional branch of ICAIL', correct: false, explanation: 'JURIX is not a regional branch of ICAIL.' },
                        { text: 'ICAIL is a regional branch of JURIX', correct: false, explanation: 'ICAIL is not a regional branch of JURIX.' },
                        { text: 'They are competing conferences', correct: false, explanation: 'They are complementary, not competing conferences.' }
                    ]
                },
                {
                    template: 'What is a key feature of JURIX\'s research focus?',
                    answers: [
                        { text: 'Practical applications in European legal practice', correct: true, explanation: 'JURIX emphasizes practical applications of AI in European legal practice, bridging the gap between research and implementation.' },
                        { text: 'Theoretical AI research only', correct: false, explanation: 'JURIX includes practical applications, not just theoretical research.' },
                        { text: 'Global legal systems only', correct: false, explanation: 'JURIX focuses on European legal systems, not global ones.' },
                        { text: 'Computer science only', correct: false, explanation: 'JURIX includes legal applications, not just computer science.' }
                    ]
                },
                {
                    template: 'What distinguishes JURIX from other AI & Law conferences?',
                    answers: [
                        { text: 'Strong emphasis on European legal informatics', correct: true, explanation: 'JURIX is distinguished by its strong emphasis on European legal informatics and the specific challenges of European legal systems.' },
                        { text: 'Focus on criminal law only', correct: false, explanation: 'JURIX covers various areas of law, not just criminal law.' },
                        { text: 'Exclusive focus on machine learning', correct: false, explanation: 'JURIX covers various AI techniques, not just machine learning.' },
                        { text: 'Focus on US legal systems', correct: false, explanation: 'JURIX focuses on European legal systems, not US ones.' }
                    ]
                }
            ],
            'jurix-lesson-2': [
                // Lesson 2: Advanced - Advanced European legal AI topics
                {
                    template: 'What is the role of EU regulations in JURIX research?',
                    answers: [
                        { text: 'Influencing AI & Law research directions', correct: true, explanation: 'EU regulations like GDPR significantly influence AI & Law research directions presented at JURIX, particularly in areas of privacy and data protection.' },
                        { text: 'Restricting research topics', correct: false, explanation: 'EU regulations guide rather than restrict research topics.' },
                        { text: 'Providing funding only', correct: false, explanation: 'EU regulations do more than just provide funding.' },
                        { text: 'Setting technical standards only', correct: false, explanation: 'EU regulations cover more than just technical standards.' }
                    ]
                },
                {
                    template: 'What is a current challenge in European legal AI discussed at JURIX?',
                    answers: [
                        { text: 'Harmonizing AI regulations across EU member states', correct: true, explanation: 'Harmonizing AI regulations across EU member states is a major current challenge discussed at JURIX, given the diverse legal systems in Europe.' },
                        { text: 'Replacing European legal systems with AI', correct: false, explanation: 'This is not a current goal in European legal AI.' },
                        { text: 'Standardizing all European laws', correct: false, explanation: 'This is not the primary challenge discussed at JURIX.' },
                        { text: 'Eliminating human judges', correct: false, explanation: 'This is not a current goal in European legal AI.' }
                    ]
                },
                {
                    template: 'What is the impact of JURIX on European legal practice?',
                    answers: [
                        { text: 'Bridging research and practical legal applications', correct: true, explanation: 'JURIX has significant impact on European legal practice by bridging the gap between AI research and practical legal applications.' },
                        { text: 'Replacing traditional legal education', correct: false, explanation: 'JURIX complements rather than replaces traditional legal education.' },
                        { text: 'Standardizing European legal procedures', correct: false, explanation: 'This is not the primary impact of JURIX.' },
                        { text: 'Focusing only on academic research', correct: false, explanation: 'JURIX has broader impact than just academic research.' }
                    ]
                },
                {
                    template: 'What is the future direction of JURIX conferences?',
                    answers: [
                        { text: 'Greater integration with EU legal frameworks', correct: true, explanation: 'JURIX is moving toward greater integration with EU legal frameworks and regulations, reflecting the evolving European legal landscape.' },
                        { text: 'Focusing only on theoretical research', correct: false, explanation: 'JURIX is not moving toward theoretical-only focus.' },
                        { text: 'Becoming more specialized in criminal law', correct: false, explanation: 'JURIX maintains broad coverage rather than specializing in criminal law.' },
                        { text: 'Reducing European focus', correct: false, explanation: 'JURIX is maintaining and strengthening its European focus.' }
                    ]
                },
                {
                    template: 'What distinguishes European legal AI research from global approaches?',
                    answers: [
                        { text: 'Strong emphasis on civil law systems and EU regulations', correct: true, explanation: 'European legal AI research is distinguished by its strong emphasis on civil law systems and EU regulations, which differ from common law approaches.' },
                        { text: 'Focus on common law systems', correct: false, explanation: 'European research focuses on civil law, not common law systems.' },
                        { text: 'Exclusive use of machine learning', correct: false, explanation: 'European research uses various AI techniques, not just machine learning.' },
                        { text: 'Rejection of traditional legal principles', correct: false, explanation: 'European research builds on rather than rejects traditional legal principles.' }
                    ]
                }
            ],
            // Journal Module - 3 lessons with ascending difficulty
            'journal': [
                // Lesson 0: Beginner - Basic facts about the Journal
                {
                    template: 'What is the Journal of AI and Law?',
                    answers: [
                        { text: 'Leading academic journal in AI & Law', correct: true, explanation: 'The Journal of AI and Law is the leading academic journal in the field.' },
                        { text: 'Industry newsletter', correct: false, explanation: 'It is not an industry newsletter.' },
                        { text: 'Government publication', correct: false, explanation: 'It is not a government publication.' },
                        { text: 'Conference proceedings', correct: false, explanation: 'It is a journal, not conference proceedings.' }
                    ]
                },
                {
                    template: 'Who publishes the Journal of AI and Law?',
                    answers: [
                        { text: 'Springer', correct: true, explanation: 'The Journal of AI and Law is published by Springer.' },
                        { text: 'Elsevier', correct: false, explanation: 'Springer, not Elsevier, publishes this journal.' },
                        { text: 'IEEE', correct: false, explanation: 'Springer, not IEEE, publishes this journal.' },
                        { text: 'ACM', correct: false, explanation: 'Springer, not ACM, publishes this journal.' }
                    ]
                },
                {
                    template: 'When was the Journal of AI and Law first published?',
                    answers: [
                        { text: '1992', correct: true, explanation: 'The Journal of AI and Law was first published in 1992.' },
                        { text: '1990', correct: false, explanation: 'The journal was not published in 1990.' },
                        { text: '1995', correct: false, explanation: 'The journal was already published by 1995.' },
                        { text: '1988', correct: false, explanation: 'The journal was not published in 1988.' }
                    ]
                },
                {
                    template: 'What type of content does the Journal of AI and Law publish?',
                    answers: [
                        { text: 'Research articles, surveys, and case studies', correct: true, explanation: 'The journal publishes high-quality research articles, surveys, and case studies.' },
                        { text: 'Only conference papers', correct: false, explanation: 'It publishes more than just conference papers.' },
                        { text: 'Only industry reports', correct: false, explanation: 'It publishes academic research, not just industry reports.' },
                        { text: 'Only legal opinions', correct: false, explanation: 'It publishes research, not legal opinions.' }
                    ]
                },
                {
                    template: 'What is the impact of the Journal of AI and Law?',
                    answers: [
                        { text: 'Leading journal in the field', correct: true, explanation: 'It is the leading academic journal in the field of AI & Law.' },
                        { text: 'Minor publication', correct: false, explanation: 'It is not a minor publication.' },
                        { text: 'Student journal', correct: false, explanation: 'It is not a student journal.' },
                        { text: 'Regional publication', correct: false, explanation: 'It has international impact, not just regional.' }
                    ]
                }
            ],
            'journal-lesson-1': [
                // Lesson 1: Intermediate - Editorial process and research areas
                {
                    template: 'What is the typical peer review process for the Journal of AI and Law?',
                    answers: [
                        { text: 'Double-blind peer review by experts', correct: true, explanation: 'The Journal of AI and Law uses double-blind peer review, where both authors and reviewers remain anonymous to ensure impartial evaluation.' },
                        { text: 'Single-blind review only', correct: false, explanation: 'The journal uses double-blind, not single-blind review.' },
                        { text: 'No peer review process', correct: false, explanation: 'The journal does use peer review.' },
                        { text: 'Open review with public comments', correct: false, explanation: 'The journal does not use open review.' }
                    ]
                },
                {
                    template: 'What is the typical publication frequency of the Journal of AI and Law?',
                    answers: [
                        { text: 'Quarterly (4 issues per year)', correct: true, explanation: 'The Journal of AI and Law is published quarterly, with four issues per year.' },
                        { text: 'Monthly', correct: false, explanation: 'The journal is not published monthly.' },
                        { text: 'Annually', correct: false, explanation: 'The journal is published more frequently than annually.' },
                        { text: 'Bimonthly', correct: false, explanation: 'The journal is published quarterly, not bimonthly.' }
                    ]
                },
                {
                    template: 'What types of research areas does the Journal of AI and Law cover?',
                    answers: [
                        { text: 'All aspects of AI & Law research', correct: true, explanation: 'The journal covers all aspects of AI & Law research, from theoretical foundations to practical applications.' },
                        { text: 'Only legal reasoning systems', correct: false, explanation: 'The journal covers more than just legal reasoning systems.' },
                        { text: 'Only machine learning applications', correct: false, explanation: 'The journal covers various AI techniques, not just machine learning.' },
                        { text: 'Only natural language processing', correct: false, explanation: 'The journal covers more than just NLP.' }
                    ]
                },
                {
                    template: 'What is the role of the Journal of AI and Law in the field?',
                    answers: [
                        { text: 'Setting research standards and directions', correct: true, explanation: 'The Journal of AI and Law plays a crucial role in setting research standards and directions for the AI & Law field.' },
                        { text: 'Providing legal advice only', correct: false, explanation: 'The journal publishes research, not legal advice.' },
                        { text: 'Training legal professionals', correct: false, explanation: 'The journal is for research, not training.' },
                        { text: 'Publishing only conference proceedings', correct: false, explanation: 'The journal publishes original research, not just conference proceedings.' }
                    ]
                },
                {
                    template: 'What distinguishes the Journal of AI and Law from other legal journals?',
                    answers: [
                        { text: 'Focus on AI applications in legal contexts', correct: true, explanation: 'The Journal of AI and Law is distinguished by its specific focus on artificial intelligence applications in legal contexts.' },
                        { text: 'Focus on traditional legal research', correct: false, explanation: 'The journal focuses on AI applications, not traditional legal research.' },
                        { text: 'Focus on computer science only', correct: false, explanation: 'The journal focuses on the intersection of AI and law, not just computer science.' },
                        { text: 'Focus on legal practice only', correct: false, explanation: 'The journal covers both research and practice aspects.' }
                    ]
                }
            ],
            'journal-lesson-2': [
                // Lesson 2: Advanced - Impact metrics and future directions
                {
                    template: 'What is the impact factor of the Journal of AI and Law?',
                    answers: [
                        { text: 'High impact in the AI & Law field', correct: true, explanation: 'The Journal of AI and Law has a high impact factor in the AI & Law field, indicating its influence on research and practice.' },
                        { text: 'Low impact factor', correct: false, explanation: 'The journal does not have a low impact factor.' },
                        { text: 'No impact factor', correct: false, explanation: 'The journal does have an impact factor.' },
                        { text: 'Declining impact factor', correct: false, explanation: 'The journal maintains a strong impact factor.' }
                    ]
                },
                {
                    template: 'What is a current trend in the Journal of AI and Law publications?',
                    answers: [
                        { text: 'Increasing focus on practical AI applications', correct: true, explanation: 'A current trend in the journal is an increasing focus on practical AI applications in legal practice and real-world implementation.' },
                        { text: 'Focusing only on theoretical research', correct: false, explanation: 'The journal is not moving toward theoretical-only focus.' },
                        { text: 'Reducing coverage of machine learning', correct: false, explanation: 'The journal is not reducing coverage of machine learning.' },
                        { text: 'Focusing only on legal theory', correct: false, explanation: 'The journal covers both theory and practice.' }
                    ]
                },
                {
                    template: 'What is the role of the Journal of AI and Law in shaping the field?',
                    answers: [
                        { text: 'Influencing research directions and priorities', correct: true, explanation: 'The Journal of AI and Law plays a key role in influencing research directions and priorities in the AI & Law field through its publication choices.' },
                        { text: 'Setting legal precedents', correct: false, explanation: 'The journal publishes research, not legal precedents.' },
                        { text: 'Training AI systems', correct: false, explanation: 'The journal publishes research about AI systems, not training them.' },
                        { text: 'Providing legal services', correct: false, explanation: 'The journal publishes research, not legal services.' }
                    ]
                },
                {
                    template: 'What is the future direction of the Journal of AI and Law?',
                    answers: [
                        { text: 'Greater integration of AI and legal practice research', correct: true, explanation: 'The journal is moving toward greater integration of AI and legal practice research, reflecting the growing importance of practical applications.' },
                        { text: 'Focusing only on theoretical AI research', correct: false, explanation: 'The journal is not moving toward theoretical-only focus.' },
                        { text: 'Reducing coverage of legal applications', correct: false, explanation: 'The journal is increasing, not reducing, coverage of legal applications.' },
                        { text: 'Becoming more specialized in specific AI techniques', correct: false, explanation: 'The journal maintains broad coverage rather than specializing.' }
                    ]
                },
                {
                    template: 'What distinguishes high-quality submissions to the Journal of AI and Law?',
                    answers: [
                        { text: 'Rigorous methodology and significant contribution to the field', correct: true, explanation: 'High-quality submissions to the journal are distinguished by rigorous methodology and significant contribution to the AI & Law field.' },
                        { text: 'Length of the paper only', correct: false, explanation: 'Quality is not determined by length alone.' },
                        { text: 'Use of specific AI techniques only', correct: false, explanation: 'Quality involves more than just technique choice.' },
                        { text: 'Focus on legal theory only', correct: false, explanation: 'Quality involves both theory and practice.' }
                    ]
                }
            ],
            // History Module - 3 lessons with ascending difficulty
            'history': [
                // Lesson 0: Beginner - Early AI & Law systems
                {
                    template: 'When did the field of AI & Law begin to emerge?',
                    answers: [
                        { text: '1970s', correct: true, explanation: 'The field of AI & Law began to emerge in the 1970s with early expert systems.' },
                        { text: '1950s', correct: false, explanation: 'AI & Law did not emerge in the 1950s.' },
                        { text: '1980s', correct: false, explanation: 'The field was already established by the 1980s.' },
                        { text: '1990s', correct: false, explanation: 'The field was already well-established by the 1990s.' }
                    ]
                },
                {
                    template: 'What was one of the first AI & Law systems?',
                    answers: [
                        { text: 'TAXMAN', correct: true, explanation: 'TAXMAN was one of the first AI & Law systems, developed in the 1970s.' },
                        { text: 'ChatGPT', correct: false, explanation: 'ChatGPT is a much more recent system.' },
                        { text: 'IBM Watson', correct: false, explanation: 'IBM Watson came much later.' },
                        { text: 'Expert Systems', correct: false, explanation: 'This is a general category, not a specific system.' }
                    ]
                },
                {
                    template: 'What type of AI systems were first used in legal applications?',
                    answers: [
                        { text: 'Rule-based expert systems', correct: true, explanation: 'Early legal AI applications used rule-based expert systems.' },
                        { text: 'Machine learning systems', correct: false, explanation: 'Machine learning came later in the field.' },
                        { text: 'Neural networks', correct: false, explanation: 'Neural networks were not used in early legal AI.' },
                        { text: 'Natural language processing', correct: false, explanation: 'NLP was not the first type of system used.' }
                    ]
                },
                {
                    template: 'What was the primary goal of early AI & Law systems?',
                    answers: [
                        { text: 'Automating legal reasoning tasks', correct: true, explanation: 'Early AI & Law systems aimed to automate legal reasoning tasks.' },
                        { text: 'Replacing human lawyers', correct: false, explanation: 'This was not the goal of early systems.' },
                        { text: 'Creating legal precedents', correct: false, explanation: 'This was not the primary goal.' },
                        { text: 'Training law students', correct: false, explanation: 'This was not the primary goal.' }
                    ]
                },
                {
                    template: 'Which field heavily influenced early AI & Law research?',
                    answers: [
                        { text: 'Expert systems research', correct: true, explanation: 'Expert systems research heavily influenced early AI & Law work.' },
                        { text: 'Machine learning', correct: false, explanation: 'Machine learning came later.' },
                        { text: 'Robotics', correct: false, explanation: 'Robotics did not heavily influence early AI & Law.' },
                        { text: 'Computer vision', correct: false, explanation: 'Computer vision did not heavily influence early AI & Law.' }
                    ]
                }
            ],
            'history-lesson-1': [
                {
                    template: 'What is a key modern application of AI in legal practice?',
                    answers: [
                        { text: 'Document review and e-discovery', correct: true, explanation: 'AI-powered document review and e-discovery is one of the most successful modern applications of AI in legal practice, helping lawyers process large volumes of documents efficiently.' },
                        { text: 'Automated legal advice', correct: false, explanation: 'While AI can assist with legal advice, fully automated legal advice is not yet a mainstream application.' },
                        { text: 'Robot judges', correct: false, explanation: 'AI is not used to replace human judges in courtrooms.' },
                        { text: 'Automated law enforcement', correct: false, explanation: 'AI is not used for automated law enforcement in the way suggested.' }
                    ]
                },
                {
                    template: 'What technology has revolutionized legal research in recent years?',
                    answers: [
                        { text: 'Natural Language Processing for legal texts', correct: true, explanation: 'NLP has revolutionized legal research by enabling more sophisticated search and analysis of legal documents and case law.' },
                        { text: 'Blockchain technology', correct: false, explanation: 'While blockchain has some legal applications, it has not revolutionized legal research in the same way as NLP.' },
                        { text: 'Virtual reality', correct: false, explanation: 'Virtual reality has not significantly impacted legal research.' },
                        { text: 'Quantum computing', correct: false, explanation: 'Quantum computing has not yet revolutionized legal research.' }
                    ]
                },
                {
                    template: 'What is predictive analytics in legal AI?',
                    answers: [
                        { text: 'Using AI to predict case outcomes and legal trends', correct: true, explanation: 'Predictive analytics in legal AI uses machine learning to analyze patterns in legal data to predict case outcomes, settlement amounts, and legal trends.' },
                        { text: 'Predicting when laws will change', correct: false, explanation: 'This is not what predictive analytics in legal AI refers to.' },
                        { text: 'Predicting judge behavior', correct: false, explanation: 'While related, this is not the primary focus of predictive analytics in legal AI.' },
                        { text: 'Predicting legal fees', correct: false, explanation: 'This is not the primary focus of predictive analytics in legal AI.' }
                    ]
                },
                {
                    template: 'What is the role of machine learning in modern legal AI?',
                    answers: [
                        { text: 'Pattern recognition and prediction in legal data', correct: true, explanation: 'Machine learning in legal AI focuses on recognizing patterns in legal data and making predictions about case outcomes, document relevance, and legal trends.' },
                        { text: 'Replacing human lawyers', correct: false, explanation: 'Machine learning is designed to assist, not replace, human legal professionals.' },
                        { text: 'Automating court proceedings', correct: false, explanation: 'Machine learning is not used to automate court proceedings.' },
                        { text: 'Creating new laws', correct: false, explanation: 'Machine learning is not used to create new laws.' }
                    ]
                },
                {
                    template: 'What is a current challenge in AI & Law?',
                    answers: [
                        { text: 'Ensuring transparency and explainability of AI decisions', correct: true, explanation: 'A major current challenge in AI & Law is ensuring that AI systems can explain their reasoning and decisions in ways that are understandable to legal professionals and the public.' },
                        { text: 'Replacing all human lawyers', correct: false, explanation: 'This is not a current goal or challenge in AI & Law.' },
                        { text: 'Making AI systems faster', correct: false, explanation: 'While speed is important, it is not the primary current challenge.' },
                        { text: 'Reducing AI system costs', correct: false, explanation: 'While cost is a consideration, it is not the primary current challenge.' }
                    ]
                }
            ],
            'cbr': [
                {
                    template: 'What is Case-Based Reasoning (CBR)?',
                    answers: [
                        { text: 'A problem-solving approach using past cases', correct: true, explanation: 'CBR solves new problems by adapting solutions from similar past cases.' },
                        { text: 'A type of machine learning algorithm', correct: false, explanation: 'While CBR can use ML, it is not itself a machine learning algorithm.' },
                        { text: 'A legal database system', correct: false, explanation: 'CBR is more than just a database; it involves reasoning and adaptation.' },
                        { text: 'A rule-based expert system', correct: false, explanation: 'CBR is different from rule-based systems; it uses cases rather than rules.' }
                    ]
                },
                {
                    template: 'What are the main steps in the CBR cycle?',
                    answers: [
                        { text: 'Retrieve, Reuse, Revise, Retain', correct: true, explanation: 'The CBR cycle consists of these four main steps for case-based problem solving.' },
                        { text: 'Input, Process, Output', correct: false, explanation: 'This is too simplistic for the CBR cycle.' },
                        { text: 'Search, Match, Apply', correct: false, explanation: 'These are components but not the complete CBR cycle.' },
                        { text: 'Learn, Adapt, Store', correct: false, explanation: 'These are aspects but not the formal CBR cycle steps.' }
                    ]
                },
                {
                    template: 'How does CBR differ from rule-based reasoning?',
                    answers: [
                        { text: 'CBR uses specific cases, rules use general principles', correct: true, explanation: 'CBR works with specific past cases while rule-based systems use general rules and principles.' },
                        { text: 'CBR is faster than rule-based reasoning', correct: false, explanation: 'Speed is not the primary difference between these approaches.' },
                        { text: 'CBR only works with legal cases', correct: false, explanation: 'CBR can be applied to many domains, not just law.' },
                        { text: 'CBR requires more computational resources', correct: false, explanation: 'Resource requirements vary and are not the defining difference.' }
                    ]
                },
                {
                    template: 'What is a key advantage of CBR in legal applications?',
                    answers: [
                        { text: 'Handles complex, ill-structured legal problems', correct: true, explanation: 'CBR excels at handling complex legal problems that are difficult to formalize with rules.' },
                        { text: 'Always provides correct legal advice', correct: false, explanation: 'No AI system can guarantee always correct legal advice.' },
                        { text: 'Replaces human lawyers entirely', correct: false, explanation: 'CBR is a tool to assist, not replace, human legal professionals.' },
                        { text: 'Works only with criminal law', correct: false, explanation: 'CBR can be applied to various areas of law, not just criminal law.' }
                    ]
                },
                {
                    template: 'What is the role of similarity in CBR?',
                    answers: [
                        { text: 'Finding relevant past cases for adaptation', correct: true, explanation: 'Similarity measures help identify the most relevant past cases to adapt for the current problem.' },
                        { text: 'Determining legal precedents', correct: false, explanation: 'While related, similarity in CBR is broader than just legal precedents.' },
                        { text: 'Calculating case outcomes', correct: false, explanation: 'Similarity is about finding relevant cases, not calculating outcomes.' },
                        { text: 'Measuring system performance', correct: false, explanation: 'Similarity is not primarily about performance measurement.' }
                    ]
                }
            ],
            'cbr-lesson-1': [
                {
                    template: 'What is the HYPO system in CBR?',
                    answers: [
                        { text: 'An early case-based reasoning system for legal argumentation', correct: true, explanation: 'HYPO was one of the first CBR systems developed for legal argumentation, created by Edwina Rissland and Kevin Ashley.' },
                        { text: 'A rule-based legal expert system', correct: false, explanation: 'HYPO was case-based, not rule-based.' },
                        { text: 'A machine learning system for legal prediction', correct: false, explanation: 'HYPO was not a machine learning system.' },
                        { text: 'A legal database management system', correct: false, explanation: 'HYPO was more than just a database system.' }
                    ]
                },
                {
                    template: 'What is the CATO system?',
                    answers: [
                        { text: 'An advanced CBR system for legal argumentation', correct: true, explanation: 'CATO is an advanced case-based reasoning system developed by Kevin Ashley for legal argumentation, building on the HYPO system.' },
                        { text: 'A legal document management system', correct: false, explanation: 'CATO is not primarily a document management system.' },
                        { text: 'A rule-based legal expert system', correct: false, explanation: 'CATO is case-based, not rule-based.' },
                        { text: 'A legal prediction system', correct: false, explanation: 'CATO focuses on argumentation, not prediction.' }
                    ]
                },
                {
                    template: 'What is the role of adaptation in CBR?',
                    answers: [
                        { text: 'Modifying past solutions to fit current problems', correct: true, explanation: 'Adaptation in CBR involves modifying solutions from past cases to fit the specific requirements of the current problem.' },
                        { text: 'Learning new rules from cases', correct: false, explanation: 'This describes rule learning, not CBR adaptation.' },
                        { text: 'Storing new cases in the database', correct: false, explanation: 'This is the retain step, not adaptation.' },
                        { text: 'Finding similar cases', correct: false, explanation: 'This is the retrieve step, not adaptation.' }
                    ]
                },
                {
                    template: 'What is a challenge in implementing CBR systems?',
                    answers: [
                        { text: 'Defining effective similarity measures', correct: true, explanation: 'A major challenge in CBR is defining similarity measures that effectively capture the relevant aspects of cases for comparison.' },
                        { text: 'Storing large amounts of data', correct: false, explanation: 'While storage is a consideration, it is not the primary challenge.' },
                        { text: 'Making the system fast enough', correct: false, explanation: 'While speed is important, it is not the primary challenge.' },
                        { text: 'Training the system', correct: false, explanation: 'CBR systems do not require traditional training like machine learning systems.' }
                    ]
                },
                {
                    template: 'How has CBR evolved in modern legal AI?',
                    answers: [
                        { text: 'Integration with machine learning and NLP techniques', correct: true, explanation: 'Modern CBR systems integrate machine learning for similarity computation and NLP for case understanding, making them more sophisticated than early systems.' },
                        { text: 'Replacement by rule-based systems', correct: false, explanation: 'CBR has not been replaced by rule-based systems.' },
                        { text: 'Simplification to basic case matching', correct: false, explanation: 'Modern CBR has become more sophisticated, not simpler.' },
                        { text: 'Focus only on criminal law', correct: false, explanation: 'Modern CBR applies to various legal domains, not just criminal law.' }
                    ]
                }
            ],
            'cbr-lesson-2': [
                // Lesson 2: Advanced - Modern CBR applications and challenges
                {
                    template: 'What is a current challenge in CBR for legal applications?',
                    answers: [
                        { text: 'Handling the complexity and diversity of legal cases', correct: true, explanation: 'A major current challenge is handling the complexity and diversity of legal cases, which requires sophisticated similarity measures and adaptation strategies.' },
                        { text: 'Making CBR systems faster', correct: false, explanation: 'While speed is important, it is not the primary current challenge.' },
                        { text: 'Reducing CBR system costs', correct: false, explanation: 'While cost is a consideration, it is not the primary current challenge.' },
                        { text: 'Replacing human legal reasoning', correct: false, explanation: 'This is not a current goal in CBR research.' }
                    ]
                },
                {
                    template: 'How has CBR evolved with modern AI techniques?',
                    answers: [
                        { text: 'Integration with machine learning for better similarity measures', correct: true, explanation: 'Modern CBR systems integrate machine learning techniques to improve similarity measures and case adaptation strategies.' },
                        { text: 'Replacement of CBR with machine learning', correct: false, explanation: 'CBR is not being replaced by machine learning.' },
                        { text: 'Focus on rule-based systems only', correct: false, explanation: 'Modern CBR integrates multiple techniques, not just rules.' },
                        { text: 'Abandonment of case-based approaches', correct: false, explanation: 'Case-based approaches are not being abandoned.' }
                    ]
                },
                {
                    template: 'What is the role of CBR in modern legal AI systems?',
                    answers: [
                        { text: 'Complementing other AI techniques for comprehensive legal reasoning', correct: true, explanation: 'CBR complements other AI techniques like machine learning and rule-based systems to provide comprehensive legal reasoning capabilities.' },
                        { text: 'Replacing all other AI techniques', correct: false, explanation: 'CBR complements rather than replaces other techniques.' },
                        { text: 'Focusing only on simple legal problems', correct: false, explanation: 'CBR handles complex legal problems, not just simple ones.' },
                        { text: 'Standardizing all legal procedures', correct: false, explanation: 'CBR does not standardize legal procedures.' }
                    ]
                },
                {
                    template: 'What is the future direction of CBR in legal AI?',
                    answers: [
                        { text: 'Greater integration with practical legal applications and real-world deployment', correct: true, explanation: 'The future direction is toward greater integration with practical legal applications and real-world deployment, moving beyond research prototypes.' },
                        { text: 'Focusing only on theoretical research', correct: false, explanation: 'CBR is moving toward practical applications, not theoretical-only focus.' },
                        { text: 'Replacing traditional legal reasoning', correct: false, explanation: 'CBR complements rather than replaces traditional legal reasoning.' },
                        { text: 'Focusing only on academic research', correct: false, explanation: 'CBR is expanding beyond just academic research.' }
                    ]
                },
                {
                    template: 'What distinguishes modern CBR from early approaches?',
                    answers: [
                        { text: 'Integration with multiple AI techniques and focus on practical applications', correct: true, explanation: 'Modern CBR is distinguished by integration with multiple AI techniques and focus on practical applications, rather than just theoretical systems.' },
                        { text: 'Focus on rule-based systems only', correct: false, explanation: 'Modern CBR integrates multiple techniques, not just rules.' },
                        { text: 'Rejection of traditional CBR principles', correct: false, explanation: 'Modern CBR builds on rather than rejects traditional principles.' },
                        { text: 'Focus on hardware implementations only', correct: false, explanation: 'Modern CBR covers software and applications, not just hardware.' }
                    ]
                }
            ],
            'history-lesson-2': [
                // Lesson 2: Advanced - Modern developments and future trends
                {
                    template: 'What characterizes the current era of AI & Law research?',
                    answers: [
                        { text: 'Integration of machine learning with traditional AI techniques', correct: true, explanation: 'The current era is characterized by the integration of machine learning with traditional AI techniques like rule-based reasoning and case-based reasoning.' },
                        { text: 'Focus on expert systems only', correct: false, explanation: 'Current research goes beyond just expert systems.' },
                        { text: 'Rejection of traditional AI techniques', correct: false, explanation: 'Current research integrates rather than rejects traditional techniques.' },
                        { text: 'Focus on hardware implementations only', correct: false, explanation: 'Current research covers software and applications, not just hardware.' }
                    ]
                },
                {
                    template: 'What is the significance of large language models in AI & Law?',
                    answers: [
                        { text: 'Enabling new approaches to legal text analysis', correct: true, explanation: 'Large language models are enabling new approaches to legal text analysis and document processing.' },
                        { text: 'Replacing all other AI techniques', correct: false, explanation: 'LLMs complement rather than replace other AI techniques.' },
                        { text: 'Making legal AI obsolete', correct: false, explanation: 'LLMs are advancing rather than making legal AI obsolete.' },
                        { text: 'Focusing only on legal advice', correct: false, explanation: 'LLMs have broader applications than just legal advice.' }
                    ]
                },
                {
                    template: 'What is a current challenge in AI & Law research?',
                    answers: [
                        { text: 'Ensuring AI systems are explainable and trustworthy', correct: true, explanation: 'A major current challenge is ensuring AI systems are explainable and trustworthy, especially in legal contexts where transparency is crucial.' },
                        { text: 'Making AI systems faster', correct: false, explanation: 'While speed is important, it is not the primary current challenge.' },
                        { text: 'Reducing AI system costs', correct: false, explanation: 'While cost is a consideration, it is not the primary current challenge.' },
                        { text: 'Replacing human legal professionals', correct: false, explanation: 'This is not a current goal in AI & Law research.' }
                    ]
                },
                {
                    template: 'What is the future direction of AI & Law research?',
                    answers: [
                        { text: 'Greater integration with legal practice and real-world applications', correct: true, explanation: 'The future direction is toward greater integration with legal practice and real-world applications, moving beyond research prototypes.' },
                        { text: 'Focusing only on theoretical research', correct: false, explanation: 'The field is moving toward practical applications, not theoretical-only focus.' },
                        { text: 'Replacing traditional legal education', correct: false, explanation: 'AI & Law complements rather than replaces traditional legal education.' },
                        { text: 'Focusing only on academic research', correct: false, explanation: 'The field is expanding beyond just academic research.' }
                    ]
                },
                {
                    template: 'What distinguishes modern AI & Law from early approaches?',
                    answers: [
                        { text: 'Integration of multiple AI techniques and real-world applications', correct: true, explanation: 'Modern AI & Law is distinguished by the integration of multiple AI techniques and focus on real-world applications, rather than just theoretical systems.' },
                        { text: 'Focus on expert systems only', correct: false, explanation: 'Modern approaches go beyond just expert systems.' },
                        { text: 'Rejection of traditional AI techniques', correct: false, explanation: 'Modern approaches integrate rather than reject traditional techniques.' },
                        { text: 'Focus on hardware only', correct: false, explanation: 'Modern approaches cover software and applications, not just hardware.' }
                    ]
                }
            ],
            // Academics Module - 3 lessons with ascending difficulty
            'academics': [
                // Lesson 0: Beginner - Pioneering academics and foundational work
                {
                    template: 'Who developed the TAXMAN system?',
                    answers: [
                        { text: 'L. Thorne McCarty and N. Sridharan', correct: true, explanation: 'L. Thorne McCarty and N. Sridharan developed the TAXMAN system, one of the first AI & Law systems in the 1970s.' },
                        { text: 'Edwina Rissland and Kevin Ashley', correct: false, explanation: 'They developed HYPO and CATO, not TAXMAN.' },
                        { text: 'Henry Prakken and Giovanni Sartor', correct: false, explanation: 'They worked on argumentation frameworks, not TAXMAN.' },
                        { text: 'Trevor Bench-Capon and Kevin Ashley', correct: false, explanation: 'They worked on different systems, not TAXMAN.' }
                    ]
                },
                {
                    template: 'What was the HYPO system designed for?',
                    answers: [
                        { text: 'Legal argumentation and case-based reasoning', correct: true, explanation: 'HYPO was designed for legal argumentation and case-based reasoning, created by Edwina Rissland and Kevin Ashley in the 1980s.' },
                        { text: 'Tax law reasoning', correct: false, explanation: 'That was TAXMAN, not HYPO.' },
                        { text: 'Legal document management', correct: false, explanation: 'HYPO was not primarily for document management.' },
                        { text: 'Legal prediction', correct: false, explanation: 'HYPO focused on argumentation, not prediction.' }
                    ]
                },
                {
                    template: 'Who is considered a pioneer of AI & Law argumentation frameworks?',
                    answers: [
                        { text: 'Henry Prakken', correct: true, explanation: 'Henry Prakken is considered a pioneer of AI & Law argumentation frameworks, developing logical tools for modeling legal argument and defeasible reasoning.' },
                        { text: 'Kevin Ashley', correct: false, explanation: 'Ashley worked on CBR systems, not argumentation frameworks.' },
                        { text: 'Edwina Rissland', correct: false, explanation: 'Rissland worked on CBR systems, not argumentation frameworks.' },
                        { text: 'Giovanni Sartor', correct: false, explanation: 'Sartor worked on legal reasoning and computational models, not argumentation frameworks.' }
                    ]
                },
                {
                    template: 'What is the CATO system known for?',
                    answers: [
                        { text: 'Advanced case-based reasoning for legal argumentation', correct: true, explanation: 'CATO is known for advanced case-based reasoning for legal argumentation, developed by Kevin Ashley building on the HYPO system.' },
                        { text: 'Rule-based legal reasoning', correct: false, explanation: 'CATO was case-based, not rule-based.' },
                        { text: 'Legal document analysis', correct: false, explanation: 'CATO focused on argumentation, not document analysis.' },
                        { text: 'Legal prediction', correct: false, explanation: 'CATO focused on argumentation, not prediction.' }
                    ]
                },
                {
                    template: 'Who developed value-based argumentation frameworks?',
                    answers: [
                        { text: 'Trevor Bench-Capon', correct: true, explanation: 'Trevor Bench-Capon developed value-based argumentation frameworks, which consider the values underlying legal arguments and their relative importance.' },
                        { text: 'Henry Prakken', correct: false, explanation: 'Prakken worked on logical argumentation frameworks.' },
                        { text: 'Kevin Ashley', correct: false, explanation: 'Ashley worked on CBR systems.' },
                        { text: 'Giovanni Sartor', correct: false, explanation: 'Sartor worked on legal reasoning and computational models.' }
                    ]
                }
            ],
            'academics-lesson-1': [
                // Lesson 1: Intermediate - Specific papers, systems, and contributions
                {
                    template: 'What is the significance of the "Logical Tools for Modelling Legal Argument" paper?',
                    answers: [
                        { text: 'Established formal frameworks for legal argumentation', correct: true, explanation: 'This paper by Henry Prakken established formal frameworks for modeling legal argumentation, introducing defeasible logic for legal reasoning.' },
                        { text: 'Introduced case-based reasoning to legal AI', correct: false, explanation: 'That was the work of Rissland and Ashley, not this paper.' },
                        { text: 'Developed the first legal expert system', correct: false, explanation: 'That was TAXMAN, not this paper.' },
                        { text: 'Created legal prediction algorithms', correct: false, explanation: 'This paper focused on argumentation, not prediction.' }
                    ]
                },
                {
                    template: 'What is the CABARET system?',
                    answers: [
                        { text: 'A hybrid rule-based and case-based reasoning system', correct: true, explanation: 'CABARET was a hybrid system that combined rule-based and case-based reasoning, developed by Edwina Rissland to handle both statutory and case law.' },
                        { text: 'A legal document management system', correct: false, explanation: 'CABARET was not primarily for document management.' },
                        { text: 'A legal prediction system', correct: false, explanation: 'CABARET focused on reasoning, not prediction.' },
                        { text: 'A legal database system', correct: false, explanation: 'CABARET was more than just a database system.' }
                    ]
                },
                {
                    template: 'What is Giovanni Sartor known for in AI & Law?',
                    answers: [
                        { text: 'Legal reasoning and computational models of law', correct: true, explanation: 'Giovanni Sartor is known for his work on legal reasoning and computational models of law, contributing to both theoretical and practical aspects of AI & Law.' },
                        { text: 'Case-based reasoning systems only', correct: false, explanation: 'Sartor worked on broader aspects of AI & Law, not just CBR.' },
                        { text: 'Legal document analysis only', correct: false, explanation: 'Sartor worked on broader aspects, not just document analysis.' },
                        { text: 'Legal prediction algorithms only', correct: false, explanation: 'Sartor worked on broader aspects, not just prediction.' }
                    ]
                },
                {
                    template: 'What is the significance of Kevin Ashley\'s work on CATO?',
                    answers: [
                        { text: 'Advanced the field of case-based reasoning in legal AI', correct: true, explanation: 'Kevin Ashley\'s work on CATO significantly advanced the field of case-based reasoning in legal AI, introducing sophisticated case comparison and argument generation techniques.' },
                        { text: 'Developed the first legal expert system', correct: false, explanation: 'That was TAXMAN by McCarty and Sridharan, not CATO.' },
                        { text: 'Created legal prediction algorithms', correct: false, explanation: 'CATO focused on argumentation, not prediction.' },
                        { text: 'Established rule-based legal reasoning', correct: false, explanation: 'CATO was case-based, not rule-based.' }
                    ]
                },
                {
                    template: 'What is the role of Edwina Rissland in AI & Law?',
                    answers: [
                        { text: 'Pioneered case-based reasoning in legal AI', correct: true, explanation: 'Edwina Rissland pioneered case-based reasoning in legal AI, developing systems like HYPO and CABARET that established the foundation for modern CBR in law.' },
                        { text: 'Developed rule-based expert systems', correct: false, explanation: 'That was McCarty and Sridharan with TAXMAN.' },
                        { text: 'Created legal prediction algorithms', correct: false, explanation: 'Rissland focused on reasoning, not prediction.' },
                        { text: 'Established argumentation frameworks', correct: false, explanation: 'That was Prakken and others, not Rissland.' }
                    ]
                }
            ],
            'academics-lesson-2': [
                // Lesson 2: Advanced - Modern contributions and community aspects
                {
                    template: 'What characterizes modern AI & Law academic research?',
                    answers: [
                        { text: 'Integration of multiple AI techniques and interdisciplinary collaboration', correct: true, explanation: 'Modern AI & Law academic research is characterized by the integration of multiple AI techniques and interdisciplinary collaboration between computer scientists, legal scholars, and practitioners.' },
                        { text: 'Focus on single AI techniques only', correct: false, explanation: 'Modern research integrates multiple techniques, not just single ones.' },
                        { text: 'Isolation from legal practice', correct: false, explanation: 'Modern research emphasizes collaboration with legal practice.' },
                        { text: 'Focus on theoretical research only', correct: false, explanation: 'Modern research includes both theoretical and practical aspects.' }
                    ]
                },
                {
                    template: 'What is the impact of academic AI & Law research on legal practice?',
                    answers: [
                        { text: 'Informing and improving legal technology applications', correct: true, explanation: 'Academic AI & Law research informs and improves legal technology applications, bridging the gap between theoretical advances and practical implementation.' },
                        { text: 'Replacing traditional legal education', correct: false, explanation: 'Academic research complements rather than replaces traditional legal education.' },
                        { text: 'Standardizing all legal procedures', correct: false, explanation: 'This is not the primary impact of academic research.' },
                        { text: 'Focusing only on theoretical contributions', correct: false, explanation: 'Academic research has broader impact than just theoretical contributions.' }
                    ]
                },
                {
                    template: 'What is a current trend in AI & Law academic research?',
                    answers: [
                        { text: 'Greater emphasis on explainable and trustworthy AI systems', correct: true, explanation: 'A current trend in AI & Law academic research is greater emphasis on explainable and trustworthy AI systems, reflecting the need for transparency in legal applications.' },
                        { text: 'Focusing only on rule-based systems', correct: false, explanation: 'Modern research goes beyond just rule-based systems.' },
                        { text: 'Rejecting traditional AI techniques', correct: false, explanation: 'Modern research integrates rather than rejects traditional techniques.' },
                        { text: 'Focusing only on machine learning', correct: false, explanation: 'Modern research includes various AI techniques, not just machine learning.' }
                    ]
                },
                {
                    template: 'What is the role of academic conferences in AI & Law research?',
                    answers: [
                        { text: 'Facilitating knowledge exchange and collaboration', correct: true, explanation: 'Academic conferences like ICAIL and JURIX facilitate knowledge exchange and collaboration between researchers, practitioners, and policymakers in the AI & Law field.' },
                        { text: 'Setting legal precedents', correct: false, explanation: 'Academic conferences do not set legal precedents.' },
                        { text: 'Training legal professionals', correct: false, explanation: 'While conferences provide learning opportunities, they are not primarily for training.' },
                        { text: 'Developing commercial products', correct: false, explanation: 'Academic conferences focus on research, not commercial product development.' }
                    ]
                },
                {
                    template: 'What distinguishes contemporary AI & Law academics from early pioneers?',
                    answers: [
                        { text: 'Access to modern AI techniques and larger datasets', correct: true, explanation: 'Contemporary AI & Law academics have access to modern AI techniques like machine learning and large datasets, enabling more sophisticated research than early pioneers.' },
                        { text: 'Focus on single AI techniques only', correct: false, explanation: 'Contemporary academics integrate multiple techniques, not just single ones.' },
                        { text: 'Rejection of early research', correct: false, explanation: 'Contemporary research builds on rather than rejects early research.' },
                        { text: 'Focus on theoretical research only', correct: false, explanation: 'Contemporary research includes both theoretical and practical aspects.' }
                    ]
                }
            ]
        };

        // Field notes for each lesson (consistent across all questions in a lesson)
        this.fieldNotes = {
            'icail': '📝 Fun Fact: The first ICAIL conference in 1987 was held in Boston and established the premier international venue for AI & Law research. Since then, it has shaped the direction of the entire field!',
            'icail-lesson-1': '🏆 The Donald H. Berman Award, named after a pioneer in AI & Law, recognizes outstanding research contributions at each ICAIL conference. It\'s one of the most prestigious awards in the field!',
            'icail-lesson-2': '🌍 ICAIL conferences rotate globally, reflecting the international nature of AI & Law research. Recent venues have included São Paulo, London, and Montreal, bringing together researchers from every continent!',
            'jurix': '⚖️ JURIX was founded in 1988 as the European counterpart to ICAIL, focusing specifically on European legal systems and the civil law tradition that dominates continental Europe!',
            'jurix-lesson-1': '🇪🇺 JURIX conferences rotate between different European countries, from Portugal to Finland, reflecting the diverse legal traditions and AI & Law communities across Europe!',
            'jurix-lesson-2': '🔒 GDPR and other EU regulations have significantly influenced AI & Law research presented at JURIX, particularly in areas of privacy, data protection, and algorithmic transparency!',
            'journal': '📚 The Journal of AI and Law, published by Springer since 1992, is the leading academic journal in the field. It publishes high-quality research that shapes the entire AI & Law community!',
            'journal-lesson-1': '👥 The journal uses double-blind peer review, ensuring that both authors and reviewers remain anonymous. This rigorous process maintains the highest standards of academic quality!',
            'journal-lesson-2': '📈 The journal\'s impact factor reflects its influence on both academic research and practical applications. Papers published here are widely cited and often lead to real-world implementations!',
            'history': '🤖 The field of AI & Law began in the 1970s with systems like TAXMAN, which could reason about tax law. These early expert systems laid the foundation for all modern legal AI applications!',
            'history-lesson-1': '📄 Document review and e-discovery represent one of the most successful applications of AI in legal practice. AI can process thousands of documents in minutes, a task that would take humans weeks!',
            'history-lesson-2': '🧠 Large language models like GPT have revolutionized legal text analysis, enabling new approaches to contract analysis, legal research, and document generation that weren\'t possible just a few years ago!',
            'academics': '👨‍🎓 L. Thorne McCarty developed TAXMAN in the 1970s, one of the first AI & Law systems. His work established many fundamental concepts still used in legal AI today!',
            'academics-lesson-1': '🔬 The "Logical Tools for Modelling Legal Argument" paper by Henry Prakken introduced formal frameworks for legal argumentation, creating the mathematical foundation for modern legal reasoning systems!',
            'academics-lesson-2': '🤝 Modern AI & Law research is highly interdisciplinary, bringing together computer scientists, legal scholars, philosophers, and practitioners to solve complex legal technology challenges!',
            'cbr': '🧠 Case-Based Reasoning (CBR) is inspired by how human lawyers think - by comparing current cases to past precedents. The HYPO system was one of the first to model this legal reasoning process!',
            'cbr-lesson-1': '⚖️ The HYPO system, developed by Edwina Rissland and Kevin Ashley, could analyze legal arguments by finding similar cases and identifying relevant factors. It pioneered many techniques still used today!',
            'cbr-lesson-2': '🔍 Modern CBR systems integrate machine learning to improve similarity measures and case adaptation. This hybrid approach combines the interpretability of CBR with the power of modern AI techniques!'
        };

        // State
        this.currentTopic = null;
        this.currentLesson = 0;
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.completedLessons = 0; // Track completed lessons in this session
        this.completedLessonsMap = {}; // { topicId: Set(lessonIdx) }
        this.fieldNotesVisible = false; // Track field notes visibility
        this.currentLessonData = null; // Store shuffled questions/options for current lesson
    }

    // Add this method to get the total number of completed lessons
    getCompletedLessonsCount() {
        let count = 0;
        for (const topicId in this.completedLessonsMap) {
            count += this.completedLessonsMap[topicId].size;
        }
        return count;
    }

    // Entry point: show topics grid
    show() {
        // Restore guest progress for consistency (do NOT reset here)
        this.restoreGuestProgress();
        this.currentTopic = null;
        this.currentLesson = 0;
        this.currentQuestion = 0;
        this.userAnswers = [];
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        // Show the learn/history section
        const historySection = document.getElementById('historySection');
        if (historySection) historySection.classList.add('active');
        // Section visibility fix
        const topicsSection = document.getElementById('topicsSection');
        const lessonSection = document.getElementById('lessonSection');
        const resultsSection = document.getElementById('resultsSection');
        if (topicsSection) topicsSection.classList.remove('hidden');
        if (lessonSection) lessonSection.classList.add('hidden');
        if (resultsSection) resultsSection.classList.add('hidden');
        // Render topics grid
        this.renderTopics();
        // Update global progress bar
        if (typeof window.updateGlobalProgress === 'function') {
            window.updateGlobalProgress();
        }
    }

    // Render the topics grid
    renderTopics() {
        const topicsGrid = document.getElementById('topicsGrid');
        if (!topicsGrid) return;
        topicsGrid.innerHTML = '';
        this.topics.forEach(topic => {
            // Per-module progress
            const completedSet = this.completedLessonsMap[topic.id] || new Set();
            const totalLessons = topic.lessonCount;
            const completedCount = completedSet.size;
            const modulePercent = Math.round((completedCount / totalLessons) * 100);
            const isCompleted = completedCount === totalLessons;
            // Next lesson difficulty (minimalist)
            let nextLessonIdx = 0;
            for (let i = 0; i < totalLessons; i++) {
                if (!completedSet.has(i)) {
                    nextLessonIdx = i;
                    break;
                }
                if (i === totalLessons - 1 && completedSet.has(i)) {
                    nextLessonIdx = 0;
                }
            }
            let difficulty = 'Easy', diffColor = '#4CAF50';
            if (nextLessonIdx === 1) { difficulty = 'Intermediate'; diffColor = '#FF9800'; }
            if (nextLessonIdx === 2) { difficulty = 'Expert'; diffColor = '#F44336'; }
            const card = document.createElement('div');
            card.className = 'topic-card' + (isCompleted ? ' completed-module' : '');
            card.innerHTML = `
                <div class="topic-header">
                    <div class="topic-icon" style="background: ${topic.color}">${topic.icon}</div>
                    <div class="topic-info">
                        <h3>${topic.title}</h3>
                    </div>
                </div>
                <p class="topic-description">${topic.description}</p>
                <div class="module-progress-bar minimalist">
                    <div class="module-progress-bar-bg">
                        <div class="module-progress-bar-fill" style="width: ${modulePercent}%"></div>
                        </div>
                    <div class="module-progress-stats">${completedCount} / ${totalLessons}</div>
                    </div>
                <div class="difficulty-minimalist">
                    ${isCompleted
                        ? `<span class="completed-badge"><span class="celebrate-icon">🎉</span> Completed</span>`
                        : `<span class="difficulty-dot" style="background:${diffColor}"></span><span class="difficulty-text">${difficulty}</span>`}
                </div>
                <div class="topic-stats">
                    ${isCompleted
                        ? `<button class="btn retry-module-btn" data-topic-id="${topic.id}"><i class="fas fa-redo"></i> Retry</button>`
                        : `<button class="btn primary start-learning-btn" data-topic-id="${topic.id}">Start<br>Learning</button>`}
                </div>
                ${isCompleted ? `<div class="confetti"></div>` : ''}
            `;
            topicsGrid.appendChild(card);
        });
        // Attach a single event listener for all Start Learning and Retry buttons
        topicsGrid.onclick = (e) => {
            const retryBtn = e.target.closest('.retry-module-btn');
            if (retryBtn) {
                const topicId = retryBtn.getAttribute('data-topic-id');
                // Reset progress for this module
                this.completedLessonsMap[topicId] = new Set();
                // Save to localStorage for guest persistence
                const progress = {};
                for (const t in this.completedLessonsMap) {
                    progress[t] = Array.from(this.completedLessonsMap[t]);
                }
                localStorage.setItem('learnProgress', JSON.stringify(progress));
                this.completedLessons = this.getCompletedLessonsCount();
                if (window.updateGlobalProgress) window.updateGlobalProgress();
                this.renderTopics();
                // Optionally, add a little animation or effect here
                return;
            }
            const btn = e.target.closest('.start-learning-btn');
            if (btn) {
                const topicId = btn.getAttribute('data-topic-id');
                this.startTopic(topicId);
            }
        };
        // Always update the global progress bar after rendering module progress bars
        if (window.updateGlobalProgressBar) window.updateGlobalProgressBar();
    }

    // Start a topic: always start at the first incomplete lesson
    startTopic(topicId) {
        this.currentTopic = this.topics.find(t => t.id === topicId);
        // Find first incomplete lesson for this topic
        let firstIncomplete = 0;
        const topicLessons = this.currentTopic ? this.currentTopic.lessonCount : 3;
        const completedSet = this.completedLessonsMap[topicId] || new Set();
        for (let i = 0; i < topicLessons; i++) {
            if (!completedSet.has(i)) {
                firstIncomplete = i;
                break;
            }
            // If all are complete, will default to 0
            if (i === topicLessons - 1 && completedSet.has(i)) {
                firstIncomplete = 0;
            }
        }
        this.currentLesson = firstIncomplete;
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.fieldNotesVisible = false; // Reset field notes visibility for new lesson
        this.showLesson();
    }

    // Render the lesson view
    showLesson() {
        // Hide topics/results, show lesson section
        const topicsSection = document.getElementById('topicsSection');
        const lessonSection = document.getElementById('lessonSection');
        const resultsSection = document.getElementById('resultsSection');
        if (topicsSection) topicsSection.classList.add('hidden');
        if (resultsSection) resultsSection.classList.add('hidden');
        if (lessonSection) {
            lessonSection.classList.remove('hidden');
            lessonSection.classList.add('active');
        }
        // Generate and store shuffled lesson data only if not already set
        if (!this.currentLessonData) {
            this.currentLessonData = this._generateShuffledLesson();
        }
        const lesson = this.getLesson();
        if (!lesson || !lesson.questions || lesson.questions.length === 0) {
            lessonSection.innerHTML = `<div class="lesson-error">⚠️ No valid lesson data for this lesson.</div>`;
            return;
        }
        lessonSection.innerHTML = `
            <div class="lesson-header">
                <button class="back-btn" id="backBtn"><i class="fas fa-arrow-left"></i><span>Back to Topics</span></button>
                <div class="lesson-meta">
                    <h2 id="lessonTitle">${lesson.title || 'Lesson'}</h2>
                    <div class="lesson-progress"><span id="currentQuestion">${this.currentQuestion + 1}</span> of <span id="totalQuestions">${lesson.questions.length}</span></div>
                </div>
            </div>
            <div class="lesson-content"><div id="questionArea"></div></div>
            <div class="lesson-navigation">
                <button class="nav-btn secondary" id="prevBtn"><i class="fas fa-arrow-left"></i><span>Previous</span></button>
                <button class="nav-btn primary" id="nextBtn"><span>${this.currentQuestion < lesson.questions.length - 1 ? 'Next' : 'Finish'}</span><i class="fas fa-arrow-right"></i></button>
            </div>
        `;
        // Render the current question
        this.renderQuestion();
        // Navigation handlers
        document.getElementById('backBtn').onclick = () => this.show();
        document.getElementById('prevBtn').onclick = () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.renderQuestion();
            }
        };
        document.getElementById('nextBtn').onclick = () => {
            if (this.currentQuestion < lesson.questions.length - 1) {
                this.currentQuestion++;
                this.renderQuestion();
            } else {
                this.showResults();
            }
        };
        // Disable prev if at first question
        document.getElementById('prevBtn').disabled = this.currentQuestion === 0;
        // Always update global progress bar after lesson navigation
        if (window.updateGlobalProgress) window.updateGlobalProgress();
    }

    // Render the current question
    renderQuestion() {
        const lesson = this.getLesson();
        const question = lesson.questions[this.currentQuestion];
        const questionArea = document.getElementById('questionArea');
        if (!questionArea) return;
        questionArea.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'question-container';
        // Question prompt
        const qPrompt = document.createElement('div');
        qPrompt.className = 'question-prompt';
        qPrompt.textContent = question.question;
        container.appendChild(qPrompt);
        // Options
        const optionsList = document.createElement('div');
        optionsList.className = 'options-list';
        question.options.forEach((opt, idx) => {
            const optDiv = document.createElement('label');
            optDiv.className = 'option-card';
            // Color feedback
            if (typeof this.userAnswers[this.currentQuestion] !== 'undefined') {
                if (idx === question.correct) {
                    optDiv.classList.add('correct');
                } else if (this.userAnswers[this.currentQuestion] === idx) {
                    optDiv.classList.add('incorrect');
                } else {
                    optDiv.classList.add('neutral');
                }
            }
            if (this.userAnswers[this.currentQuestion] === idx) optDiv.classList.add('selected');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'option';
            radio.value = idx;
            radio.checked = this.userAnswers[this.currentQuestion] === idx;
            radio.tabIndex = 0;
            radio.disabled = typeof this.userAnswers[this.currentQuestion] !== 'undefined';
            radio.addEventListener('change', () => {
                this.userAnswers[this.currentQuestion] = idx;
                this.renderQuestion();
            });
            optDiv.appendChild(radio);
            const textSpan = document.createElement('span');
            textSpan.className = 'option-text';
            textSpan.textContent = opt.text;
            optDiv.appendChild(textSpan);
            optionsList.appendChild(optDiv);
        });
        container.appendChild(optionsList);
        // Explanation at the bottom (only for selected option)
        if (typeof this.userAnswers[this.currentQuestion] !== 'undefined') {
            const pickedIdx = this.userAnswers[this.currentQuestion];
            const picked = question.options[pickedIdx];
            const isCorrect = pickedIdx === question.correct;
            const explBox = document.createElement('div');
            explBox.className = 'explanation-box single';
            explBox.innerHTML = `
                <div class="explanation-verdict ${isCorrect ? 'correct' : 'incorrect'}">
                    <strong>${isCorrect ? 'Correct!' : 'Incorrect'}</strong>
                </div>
                <div class="explanation-text">${picked.explanation}</div>
            `;
            container.appendChild(explBox);
        }
        // Field Notes (toggleable, lesson-specific)
        const lessonKey = this.currentTopic ? `${this.currentTopic.id}${this.currentLesson > 0 ? `-lesson-${this.currentLesson}` : ''}` : '';
        const fieldNote = this.fieldNotes[lessonKey];
        
        if (fieldNote) {
            const fieldNotesContainer = document.createElement('div');
            fieldNotesContainer.className = 'field-notes-container';
            
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'field-notes-toggle';
            toggleBtn.innerHTML = `<i class="fas fa-lightbulb"></i> <span>${this.fieldNotesVisible ? 'Hide' : 'Show'} Field Notes</span>`;
            toggleBtn.onclick = () => {
                this.fieldNotesVisible = !this.fieldNotesVisible;
                const notesBox = fieldNotesContainer.querySelector('.field-notes-box');
                const btnText = toggleBtn.querySelector('span');
                if (this.fieldNotesVisible) {
                    notesBox.style.display = 'block';
                    btnText.textContent = 'Hide Field Notes';
                } else {
                    notesBox.style.display = 'none';
                    btnText.textContent = 'Show Field Notes';
                }
            };
            
            const notesBox = document.createElement('div');
            notesBox.className = 'field-notes-box';
            notesBox.style.display = this.fieldNotesVisible ? 'block' : 'none';
            notesBox.innerHTML = `<strong>Field Notes:</strong> <span>${fieldNote}</span>`;
            
            fieldNotesContainer.appendChild(toggleBtn);
            fieldNotesContainer.appendChild(notesBox);
            container.appendChild(fieldNotesContainer);
        }

        questionArea.appendChild(container);
        // Update lesson progress
        const currentQ = document.getElementById('currentQuestion');
        const totalQ = document.getElementById('totalQuestions');
        if (currentQ) currentQ.textContent = (this.currentQuestion + 1).toString();
        if (totalQ) totalQ.textContent = lesson.questions.length.toString();
    }

    // Show results for the lesson
    showResults() {
        // Store the finished lesson index before any possible increment
        const finishedLessonIdx = this.currentLesson;
        // Hide lesson, show results section
        const lessonSection = document.getElementById('lessonSection');
        const resultsSection = document.getElementById('resultsSection');
        const topicsSection = document.getElementById('topicsSection');
        if (lessonSection) lessonSection.classList.add('hidden');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            resultsSection.classList.add('active');
        }
        if (topicsSection) topicsSection.classList.add('hidden');
        // Calculate results
        const lesson = this.getLesson();
        let correct = 0;
        for (let i = 0; i < lesson.questions.length; i++) {
            if (this.userAnswers[i] !== undefined && this.userAnswers[i] === lesson.questions[i].correct) {
                correct++;
            }
        }
        const total = lesson.questions.length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        const title = percentage >= 80 ? '🎉 Lesson Complete!' : '❌ Lesson Finished';
        const subtitle = percentage >= 80 ? 'Great job! You passed this lesson.' : 'Keep practicing and try again!';
        // Determine if there is a next lesson
        const topic = this.currentTopic;
        const isLastLesson = this.currentLesson >= (topic ? (topic.lessonCount || 3) - 1 : 2);
        let actionsHtml = `
            <button class="action-btn secondary" id="retryBtn"><i class="fas fa-redo"></i><span>Retry</span></button>
            <button class="action-btn primary" id="backToTopicsBtn"><i class="fas fa-home"></i><span>Topics</span></button>
        `;
        if (!isLastLesson && percentage >= 80) {
            actionsHtml = `
                <button class="action-btn secondary" id="retryBtn"><i class="fas fa-redo"></i><span>Retry</span></button>
                <button class="action-btn" id="nextLessonBtn"><i class="fas fa-arrow-right"></i><span>Next Lesson</span></button>
                <button class="action-btn primary" id="backToTopicsBtn"><i class="fas fa-home"></i><span>Topics</span></button>
            `;
        }
        resultsSection.innerHTML = `
            <div class="results-card">
                <h2 class="results-title">${title}</h2>
                <div class="results-subtitle">${subtitle}</div>
                <div class="results-score-row">
                    <div class="score-circle-lg" style="background:${percentage>=80?'linear-gradient(135deg,#22c55e 0%,#16a34a 100%)':'linear-gradient(135deg,#f87171 0%,#dc2626 100%)'};box-shadow:${percentage>=80?'0 8px 32px rgba(34,197,94,0.15)':'0 8px 32px rgba(248,113,113,0.15)'};">
                        <span id="scorePercentage">${percentage}%</span>
                    </div>
                    <div class="results-details">
                        <div class="results-correct"><span id="correctAnswers">${correct}</span> / <span id="totalAnswers">${total}</span> correct</div>
                    </div>
                </div>
                <div class="results-actions">
                    ${actionsHtml}
                </div>
            </div>
        `;
        document.getElementById('retryBtn').onclick = () => {
            this.userAnswers = [];
            this.currentQuestion = 0;
            this.currentLessonData = null; // Reset so new shuffle occurs
            this.showLesson();
        };
        document.getElementById('backToTopicsBtn').onclick = () => {
            this.currentLessonData = null; // Reset when going back to topics
            this.show();
        };
        if (!isLastLesson && percentage >= 80) {
            document.getElementById('nextLessonBtn').onclick = () => {
                this.currentLesson++;
                this.currentQuestion = 0;
                this.userAnswers = [];
                this.fieldNotesVisible = false; // Reset field notes visibility for next lesson
                this.currentLessonData = null; // Reset so new shuffle occurs
                this.showLesson();
                // Update progress bar after lesson change
                if (window.updateGlobalProgress) window.updateGlobalProgress();
            };
        }
        // Mark lesson as completed for guest/session (use finishedLessonIdx) ONLY if passed
        if (this.currentTopic && typeof finishedLessonIdx === 'number') {
            const topicId = this.currentTopic.id;
            if (!this.completedLessonsMap[topicId]) {
                this.completedLessonsMap[topicId] = new Set();
            }
            if (percentage >= 80) {
                this.completedLessonsMap[topicId].add(finishedLessonIdx);
            } else {
                // Remove from completed if it was previously marked (e.g., on retry)
                this.completedLessonsMap[topicId].delete(finishedLessonIdx);
            }
            // Save to localStorage for guest persistence (optional)
            const progress = {};
            for (const t in this.completedLessonsMap) {
                progress[t] = Array.from(this.completedLessonsMap[t]);
            }
            localStorage.setItem('learnProgress', JSON.stringify(progress));
            // Also store score/total_questions for robust backend sync
            let lessonScores = {};
            try { lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}'); } catch (e) {}
            if (!lessonScores[topicId]) lessonScores[topicId] = {};
            lessonScores[finishedLessonIdx] = { score: correct, total_questions: total };
            localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
            // Also save to backend if logged in
            console.log('Calling saveUserProgressToBackend after progress update', progress);
            this.saveUserProgressToBackend(progress);
        }
        // Update completedLessons for progress bar
        this.completedLessons = this.getCompletedLessonsCount();
        if (window.updateGlobalProgress) window.updateGlobalProgress();
    }

    // On load, try to restore guest progress from localStorage
    restoreGuestProgress() {
        let progress = {};
        try {
            progress = JSON.parse(localStorage.getItem('learnProgress')) || {};
        } catch (e) { progress = {}; }
        for (const topicId in progress) {
            this.completedLessonsMap[topicId] = new Set(progress[topicId]);
        }
        this.completedLessons = this.getCompletedLessonsCount();
        // Always update global progress bar after restoring progress
        if (window.updateGlobalProgress) window.updateGlobalProgress();
    }

    // Fisher-Yates shuffle helper
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Helper: get lesson data for current topic/lesson
    getLesson() {
        return this.currentLessonData;
    }

    // Internal: generate and shuffle lesson data
    _generateShuffledLesson() {
        const topic = this.currentTopic;
        const lessonIndex = this.currentLesson;
        if (!topic) return null;
        // Use the same chunking logic as before
        let lessonTemplate = null;
        if (lessonIndex > 0 && Array.isArray(this.questionTemplates[`${topic.id}-lesson-${lessonIndex}`])) {
            lessonTemplate = this.questionTemplates[`${topic.id}-lesson-${lessonIndex}`];
        } else if (Array.isArray(this.questionTemplates[topic.id])) {
            if (Array.isArray(this.questionTemplates[topic.id][lessonIndex])) {
                lessonTemplate = this.questionTemplates[topic.id][lessonIndex];
            } else {
                const chunkSize = topic.questionsPerLesson || 5;
                const start = lessonIndex * chunkSize;
                const end = start + chunkSize;
                lessonTemplate = this.questionTemplates[topic.id].slice(start, end);
            }
        }
        if (!lessonTemplate || lessonTemplate.length === 0) return null;
        // Shuffle questions for this lesson
        const shuffledQuestions = this.shuffleArray([...lessonTemplate]);
        const questions = shuffledQuestions.map(q => {
            // Shuffle options and find new correct index
            const shuffledOptions = this.shuffleArray([...q.answers]);
            const correctIndex = shuffledOptions.findIndex(opt => opt.correct);
            return {
                question: q.template,
                options: shuffledOptions,
                correct: correctIndex
            };
        });
        return {
            title: `${topic.title} - Lesson ${lessonIndex + 1}`,
            questions
        };
    }

    // Helper: check if user is logged in
    isLoggedIn() {
        // You may want to improve this check based on your auth system
        const username = this.getCurrentUser();
        return username && username !== 'Guest';
    }

    // Helper: get current username (assumes #username element or similar)
    getCurrentUser() {
        const usernameElement = document.getElementById('username');
        return usernameElement ? usernameElement.textContent : null;
    }

    // Save user progress to backend if logged in (one request per lesson)
    async saveUserProgressToBackend(progress) {
        if (!this.isLoggedIn()) return;
        try {
            // For each topic and lesson, send a POST to /api/progress
            for (const topic in progress) {
                for (const lessonIdx of progress[topic]) {
                    // Try to get score/total_questions from localStorage or in-memory (if available)
                    let score = 0;
                    let total_questions = 0;
                    // Try to get from localStorage (if previously saved)
                    try {
                        const scores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
                        if (scores[topic] && scores[topic][lessonIdx]) {
                            score = scores[topic][lessonIdx].score || 0;
                            total_questions = scores[topic][lessonIdx].total_questions || 0;
                        }
                    } catch (e) {}
                    // Fallback: if this.userAnswers exists for this lesson, count correct answers
                    // (This is a best effort; ideally, you should store scores at completion time)
                    const payload = {
                        topic,
                        lesson: lessonIdx.toString(),
                        completed: true,
                        score,
                        total_questions
                    };
                    try {
                        const resp = await fetch('/api/progress', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify(payload)
                        });
                        if (resp.ok) {
                            console.log('Saved progress for user', this.getCurrentUser(), payload);
                        } else {
                            const errText = await resp.text();
                            console.error('Failed to save progress for user', this.getCurrentUser(), payload, errText);
                            this.showMessage('Failed to save your progress to the server. Please check your connection.', 'error');
                        }
                    } catch (err) {
                        console.error('Error during progress save fetch', err, payload);
                        this.showMessage('Failed to save your progress to the server. Please check your connection.', 'error');
                    }
                }
            }
        } catch (e) {
            console.error('Failed to save user progress to backend', e);
            this.showMessage('Failed to save your progress to the server. Please check your connection.', 'error');
        }
    }

    // Load user progress from backend and update state
    async loadUserProgressFromBackend() {
        if (!this.isLoggedIn()) return;
        try {
            const resp = await fetch('/api/progress', {
                method: 'GET',
                credentials: 'include'
            });
            if (resp.ok) {
                const data = await resp.json();
                if (data.progress && Array.isArray(data.progress)) {
                    // Reconstruct progress map: { topic: [lessonIdx, ...] }
                    const progressMap = {};
                    for (const rec of data.progress) {
                        if (rec.completed) {
                            if (!progressMap[rec.topic]) progressMap[rec.topic] = [];
                            // Store as integer if possible
                            const lessonNum = isNaN(rec.lesson) ? rec.lesson : parseInt(rec.lesson, 10);
                            if (!progressMap[rec.topic].includes(lessonNum)) {
                                progressMap[rec.topic].push(lessonNum);
                            }
                        }
                    }
                    // Update in-memory and localStorage
                    for (const topicId in progressMap) {
                        this.completedLessonsMap[topicId] = new Set(progressMap[topicId]);
                    }
                    localStorage.setItem('learnProgress', JSON.stringify(progressMap));
                    this.completedLessons = this.getCompletedLessonsCount();
                    if (window.updateGlobalProgress) window.updateGlobalProgress();
                    console.log('Loaded progress from backend for user', this.getCurrentUser(), progressMap);
                }
            } else {
                const errText = await resp.text();
                console.error('Failed to load progress from backend', errText);
                this.showMessage('Failed to load your progress from the server.', 'error');
            }
        } catch (e) {
            console.error('Failed to load user progress from backend', e);
            this.showMessage('Failed to load your progress from the server.', 'error');
        }
    }

    // Show a user-facing notification (simple, top-right corner)
    showMessage(message, type = 'info') {
        // Remove any existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            font-size: 1.1rem;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3500);
    }

    // Public: call this after login to sync backend progress
    async syncUserProgressOnLogin() {
        await this.loadUserProgressFromBackend();
        this.renderTopics();
    }
} // Only one closing brace for the class