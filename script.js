// AI & Law Learning App - Main JavaScript File

class AILawLearningApp {
    constructor() {
        console.log('DEBUG: AILawLearningApp constructor called');
        console.log('DEBUG: Document ready state in constructor:', document.readyState);
        
        // Test DOM element availability
        const testElement = document.getElementById('historyTopicsGrid');
        console.log('DEBUG: historyTopicsGrid in constructor:', testElement);
        
        if (testElement) {
            console.log('DEBUG: Element found! ID:', testElement.id, 'Tag:', testElement.tagName, 'Classes:', testElement.className);
        } else {
            console.log('DEBUG: Element not found in constructor');
            // List all elements with IDs for debugging
            const allElementsWithIds = document.querySelectorAll('[id]');
            console.log('DEBUG: All elements with IDs:', allElementsWithIds.length);
            allElementsWithIds.forEach(el => {
                console.log('DEBUG: -', el.id, el.tagName);
            });
        }
        
        this.API_BASE_URL = 'http://localhost:5004/api';
        this.currentUser = null;
        this.userProgress = {};
        this.completedLessons = [];
        this.currentSection = 'history';
        this.currentTopic = null;
        this.currentLesson = 0;
        this.currentQuestion = 0;
        this.questions = [];
        this.userAnswers = [];
        this.generatedQuestions = {};
        
        // AI & Law Topics
        this.historyTopics = [
            {
                id: 'icail',
                title: 'ICAIL Conference',
                icon: '🏛️',
                description: 'Explore the premier international conference on Artificial Intelligence and Law.',
                color: '#4CAF50',
                lessonCount: 3,
                questionsPerLesson: 5
            },
            {
                id: 'jurix',
                title: 'JURIX Conference',
                icon: '⚖️',
                description: 'Explore the European conference on Legal Knowledge and Information Systems.',
                color: '#2196F3',
                lessonCount: 3,
                questionsPerLesson: 5
            },
            {
                id: 'journal',
                title: 'Journal of AI and Law',
                icon: '📚',
                description: 'Discover the leading academic journal in the field of Artificial Intelligence and Law.',
                color: '#FF9800',
                lessonCount: 3,
                questionsPerLesson: 5
            },
            {
                id: 'history',
                title: 'History of AI & Law',
                icon: '📜',
                description: 'Trace the evolution of AI & Law from early expert systems to modern applications.',
                color: '#9C27B0',
                lessonCount: 3,
                questionsPerLesson: 5
            },
            {
                id: 'academics',
                title: 'AI and Law Academics',
                icon: '🎓',
                description: 'Learn about key academics and their groundbreaking work in the field of AI & Law.',
                color: '#E91E63',
                lessonCount: 3,
                questionsPerLesson: 5
            },
            {
                id: 'cbr',
                title: 'Case-Based Reasoning',
                icon: '🧠',
                description: 'Learn about case-based reasoning systems and their applications in legal AI.',
                color: '#795548',
                lessonCount: 3,
                questionsPerLesson: 5
            }
        ];
        
        // Question templates for AI & Law topics
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
                    template: 'How often is ICAIL typically held?',
                    answers: [
                        { text: 'Biennially (every 2 years)', correct: true, explanation: 'ICAIL is held biennially, alternating with other major AI & Law conferences.' },
                        { text: 'Annually', correct: false, explanation: 'ICAIL is not held annually.' },
                        { text: 'Every 3 years', correct: false, explanation: 'ICAIL is held more frequently than every 3 years.' },
                        { text: 'Every 4 years', correct: false, explanation: 'ICAIL is held more frequently than every 4 years.' }
                    ]
                },
                {
                    template: 'What type of venue is ICAIL?',
                    answers: [
                        { text: 'Academic research conference', correct: true, explanation: 'ICAIL is primarily an academic research conference for AI & Law scholars.' },
                        { text: 'Industry trade show', correct: false, explanation: 'ICAIL is not an industry trade show.' },
                        { text: 'Government symposium', correct: false, explanation: 'ICAIL is not a government symposium.' },
                        { text: 'Legal practice workshop', correct: false, explanation: 'While practitioners attend, ICAIL is primarily academic.' }
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
                    template: 'What is the typical acceptance rate for papers at ICAIL?',
                    answers: [
                        { text: 'Around 25-30%', correct: true, explanation: 'ICAIL maintains a competitive acceptance rate of around 25-30%, ensuring high-quality research presentations.' },
                        { text: 'Over 50%', correct: false, explanation: 'ICAIL is more selective than this.' },
                        { text: 'Under 10%', correct: false, explanation: 'ICAIL is not this selective.' },
                        { text: 'Around 75%', correct: false, explanation: 'ICAIL is much more selective than this.' }
                    ]
                },
                {
                    template: 'What type of submissions does ICAIL typically accept?',
                    answers: [
                        { text: 'Full papers, short papers, and system demonstrations', correct: true, explanation: 'ICAIL accepts full papers, short papers, and system demonstrations, providing multiple ways to contribute to the conference.' },
                        { text: 'Only full papers', correct: false, explanation: 'ICAIL accepts more than just full papers.' },
                        { text: 'Only posters', correct: false, explanation: 'ICAIL accepts more than just posters.' },
                        { text: 'Only invited talks', correct: false, explanation: 'ICAIL accepts more than just invited talks.' }
                    ]
                },
                {
                    template: 'Which of the following is NOT a typical research area at ICAIL?',
                    answers: [
                        { text: 'Criminal Law Enforcement', correct: true, explanation: 'While related, criminal law enforcement is not a primary focus area of ICAIL.' },
                        { text: 'Legal Knowledge Representation', correct: false, explanation: 'This is a core research area at ICAIL.' },
                        { text: 'Computational Models of Legal Argumentation', correct: false, explanation: 'This is a key research area at ICAIL.' },
                        { text: 'Natural Language Processing for Legal Texts', correct: false, explanation: 'This is a major research area at ICAIL.' }
                    ]
                },
                {
                    template: 'What is the primary audience of ICAIL?',
                    answers: [
                        { text: 'AI & Law researchers and practitioners', correct: true, explanation: 'ICAIL primarily serves AI & Law researchers and practitioners from academia and industry.' },
                        { text: 'Only academic researchers', correct: false, explanation: 'ICAIL serves both academic and industry practitioners.' },
                        { text: 'Only legal practitioners', correct: false, explanation: 'ICAIL serves both researchers and practitioners.' },
                        { text: 'Only computer scientists', correct: false, explanation: 'ICAIL serves a broader audience than just computer scientists.' }
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
                    template: 'What is a current challenge in AI & Law research presented at ICAIL?',
                    answers: [
                        { text: 'Ensuring AI systems are explainable and transparent', correct: true, explanation: 'Explainability and transparency of AI systems in legal applications is a major current challenge discussed at ICAIL.' },
                        { text: 'Making AI systems faster', correct: false, explanation: 'While speed is important, it is not the primary current challenge.' },
                        { text: 'Reducing AI system costs', correct: false, explanation: 'While cost is a consideration, it is not the primary current challenge.' },
                        { text: 'Replacing human lawyers', correct: false, explanation: 'This is not a current goal in AI & Law research.' }
                    ]
                },
                {
                    template: 'What is the impact factor of research presented at ICAIL?',
                    answers: [
                        { text: 'High impact on the AI & Law field', correct: true, explanation: 'Research presented at ICAIL has high impact on the AI & Law field, often leading to significant advances in the discipline.' },
                        { text: 'Limited to academic circles only', correct: false, explanation: 'ICAIL research has broader impact beyond just academic circles.' },
                        { text: 'Primarily theoretical with no practical applications', correct: false, explanation: 'ICAIL research includes both theoretical and practical applications.' },
                        { text: 'Focused only on legal practice', correct: false, explanation: 'ICAIL research covers both theoretical and practical aspects.' }
                    ]
                },
                {
                    template: 'What is the future direction of ICAIL conferences?',
                    answers: [
                        { text: 'Increasing integration of AI and legal practice', correct: true, explanation: 'ICAIL is moving toward greater integration of AI research with practical legal applications and real-world implementation.' },
                        { text: 'Focusing only on theoretical research', correct: false, explanation: 'ICAIL is not moving toward theoretical-only focus.' },
                        { text: 'Becoming more specialized in specific legal domains', correct: false, explanation: 'ICAIL maintains broad coverage rather than specializing.' },
                        { text: 'Reducing interaction with legal practitioners', correct: false, explanation: 'ICAIL is increasing, not reducing, interaction with practitioners.' }
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
            'academics': {
                0: [{
                    title: 'Pioneers of AI & Law',
                    content: 'The field of AI & Law has been shaped by pioneering researchers like L. Thorne McCarty and N. Sridharan (TAXMAN), Edwina Rissland (HYPO, CABARET), and others who developed foundational systems that established the basis for modern legal AI applications.'
                }],
                1: [{
                    title: 'Key Academic Contributions',
                    content: 'Leading academics like Henry Prakken (Logical Tools for Modelling Legal Argument), Kevin Ashley (CATO), Trevor Bench-Capon (value-based argumentation), and Giovanni Sartor have made significant contributions that continue to influence the field today.'
                }]
            },
            'cbr': {
                0: [{
                    title: 'Case-Based Reasoning in Legal AI',
                    content: 'Case-Based Reasoning (CBR) is particularly well-suited for legal applications because legal reasoning often involves comparing current cases to past precedents. CBR systems can help legal professionals find relevant cases and understand how similar situations were resolved.'
                }],
                1: [{
                    title: 'CBR Applications in Law',
                    content: 'CBR has been successfully applied to various legal domains including contract analysis, legal document retrieval, and decision support systems. The ability to handle complex, ill-structured problems makes CBR valuable for legal reasoning tasks.'
                }]
            },
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
                        { text: 'A hybrid rule-based and case-based reasoning system', correct: true, explanation: 'CABARET was a hybrid system that combined rule-based and case-based reasoning, developed by Edwina Rissland.' },
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
                        { text: 'Advanced the field of case-based reasoning in legal AI', correct: true, explanation: 'Kevin Ashley\'s work on CATO significantly advanced the field of case-based reasoning in legal AI, building on HYPO and creating more sophisticated systems.' },
                        { text: 'Developed the first legal expert system', correct: false, explanation: 'That was TAXMAN, not CATO.' },
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
    }

    async initializeApp() {
        console.log('DEBUG: Starting app initialization...');
        this.bindEvents();
        
        // Check if user is authenticated
        const isAuthenticated = await this.checkAuthStatus();
        console.log('DEBUG: Authentication check complete, isAuthenticated:', isAuthenticated);
        
        // If not authenticated, load localStorage progress for guest mode
        if (!isAuthenticated) {
            this.loadGuestProgress();
            this.updateProgress(); // Ensure progress bar updates for guests
        }
        
        // Update auth button based on authentication status
        this.updateAuthButton();
        
        // Start with the history section (AI & Law topics)
        console.log('DEBUG: Switching to history section...');
        this.switchSection('history');
        
        // Don't automatically show auth screen - let users browse first
        // Users can choose to login later if they want to save progress
        
        console.log('DEBUG: App initialization complete');
    }

    bindEvents() {
        // Navigation events - only bind if elements exist
        const backBtn = document.getElementById('backBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (backBtn) backBtn.addEventListener('click', () => this.showTopics());
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousQuestion());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        
        // Results events - only bind if elements exist
        const retryBtn = document.getElementById('retryBtn');
        const nextLessonBtn = document.getElementById('nextLessonBtn');
        const backToTopicsBtn = document.getElementById('backToTopicsBtn');
        
        if (retryBtn) retryBtn.addEventListener('click', () => this.retryLesson());
        if (nextLessonBtn) nextLessonBtn.addEventListener('click', () => this.nextLesson());
        if (backToTopicsBtn) backToTopicsBtn.addEventListener('click', () => this.showTopics());
        
        // Sidebar navigation events - bind to actual sidebar nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section) {
                    this.switchSection(section);
                }
            });
        });
        
        // History section events - only bind if elements exist
        const historyBackBtn = document.getElementById('historyBackBtn');
        const historyPrevBtn = document.getElementById('historyPrevBtn');
        const historyNextBtn = document.getElementById('historyNextBtn');
        const historyRetryBtn = document.getElementById('historyRetryBtn');
        const historyNextLessonBtn = document.getElementById('historyNextLessonBtn');
        const historyBackToTopicsBtn = document.getElementById('historyBackToTopicsBtn');
        
        if (historyBackBtn) historyBackBtn.addEventListener('click', () => this.showHistoryTopics());
        if (historyPrevBtn) historyPrevBtn.addEventListener('click', () => this.previousHistoryQuestion());
        if (historyNextBtn) historyNextBtn.addEventListener('click', () => this.nextHistoryQuestion());
        if (historyRetryBtn) historyRetryBtn.addEventListener('click', () => this.retryHistoryLesson());
        if (historyNextLessonBtn) historyNextLessonBtn.addEventListener('click', () => this.nextHistoryLesson());
        if (historyBackToTopicsBtn) historyBackToTopicsBtn.addEventListener('click', () => this.showHistoryTopics());
        
        // Authentication events
        const closeAuthModal = document.getElementById('closeAuthModal');
        const continueAsGuest = document.getElementById('continueAsGuest');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const closeMessage = document.getElementById('closeMessage');
        
        if (closeAuthModal) closeAuthModal.addEventListener('click', () => {
            document.getElementById('authModal').classList.add('hidden');
        });
        
        if (continueAsGuest) continueAsGuest.addEventListener('click', () => {
            document.getElementById('authModal').classList.add('hidden');
            this.showHistoryTopics();
        });
        
        if (loginTab) loginTab.addEventListener('click', () => this.switchAuthTab('login'));
        if (registerTab) registerTab.addEventListener('click', () => this.switchAuthTab('register'));
        
        if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        if (registerForm) {
            console.log('DEBUG: Binding submit event to registerForm');
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        } else {
            console.log('DEBUG: registerForm not found during event binding');
        }
        
        if (closeMessage) closeMessage.addEventListener('click', () => {
            document.getElementById('messagePopup').classList.add('hidden');
        });
    }

    switchSection(section) {
        console.log('DEBUG: switchSection called with section:', section);
        this.currentSection = section;
        
        // Update sidebar navigation highlighting
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const itemSection = item.getAttribute('data-section');
            if (itemSection === section) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Show/hide sections
        const historySection = document.getElementById('historySection');
        const researchSection = document.getElementById('researchSection');
        const leaderboardSection = document.getElementById('leaderboardSection');
        
        // Hide all sections first
        if (historySection) historySection.classList.remove('active');
        if (researchSection) researchSection.classList.remove('active');
        if (leaderboardSection) leaderboardSection.classList.remove('active');
        
        // Show the selected section
        if (section === 'history' && historySection) {
            historySection.classList.add('active');
        } else if (section === 'research' && researchSection) {
            researchSection.classList.add('active');
        } else if (section === 'leaderboard' && leaderboardSection) {
            leaderboardSection.classList.add('active');
        }
        
        // Load appropriate content
        if (section === 'history') {
            console.log('DEBUG: About to call renderHistoryTopics...');
            this.renderHistoryTopics();
        } else if (section === 'leaderboard') {
            this.loadLeaderboard();
        }
        
        this.updateProgress();
        
        // Update the page title (browser tab)
        document.title = {
          history: "AI & Law Learning - History",
          research: "AI & Law Learning - Research",
          leaderboard: "AI & Law Learning - Leaderboard"
        }[section] || "AI & Law Learning";

        // Update the visible page title and subtitle
        const pageTitle = document.getElementById('pageTitle');
        const pageSubtitle = document.getElementById('pageSubtitle');
        if (pageTitle && pageSubtitle) {
            if (section === 'history') {
                pageTitle.textContent = 'Learn';
                pageSubtitle.textContent = 'Choose a topic to start learning';
            } else if (section === 'research') {
                pageTitle.textContent = 'Research';
                pageSubtitle.textContent = 'Explore recent papers in AI & Law';
            } else if (section === 'leaderboard') {
                pageTitle.textContent = 'Leaderboard';
                pageSubtitle.textContent = 'See how you rank among learners';
            } else {
                pageTitle.textContent = 'AI & Law Learning';
                pageSubtitle.textContent = '';
            }
        }
        // Update the visible page title and subtitle (force at end)
        setTimeout(() => {
            const pageTitle = document.getElementById('pageTitle');
            const pageSubtitle = document.getElementById('pageSubtitle');
            if (pageTitle && pageSubtitle) {
                if (section === 'history') {
                    pageTitle.textContent = 'Learn';
                    pageSubtitle.textContent = 'Choose a topic to start learning';
                } else if (section === 'research') {
                    pageTitle.textContent = 'Research';
                    pageSubtitle.textContent = 'Explore recent papers in AI & Law';
                } else if (section === 'leaderboard') {
                    pageTitle.textContent = 'Leaderboard';
                    pageSubtitle.textContent = 'See how you rank among learners';
                } else {
                    pageTitle.textContent = 'AI & Law Learning';
                    pageSubtitle.textContent = '';
                }
            }
        }, 0);
    }

    renderTopics() {
        // Since we only have history topics now, redirect to history section
        this.switchSection('history');
    }

    renderHistoryTopics() {
        // Use a more reliable approach to find the element with retry logic
        let topicsGrid = document.getElementById('historyTopicsGrid');
        
        // Try alternative methods if getElementById fails
        if (!topicsGrid) {
            console.log('DEBUG: getElementById failed, trying querySelector...');
            topicsGrid = document.querySelector('#historyTopicsGrid');
        }
        
        if (!topicsGrid) {
            console.log('DEBUG: querySelector failed, trying to find by class...');
            const topicsSections = document.querySelectorAll('.topics-grid');
            console.log('DEBUG: Found topics-grid elements:', topicsSections.length);
            if (topicsSections.length > 0) {
                topicsGrid = topicsSections[0];
                console.log('DEBUG: Using first topics-grid element');
            }
        }
        
        if (!topicsGrid) {
            console.log('DEBUG: All element finding methods failed, retrying in 100ms...');
            console.log('DEBUG: Available elements with "history" in ID:');
            document.querySelectorAll('[id*="history"]').forEach(el => {
                console.log('DEBUG: -', el.id, el.tagName, el.className);
            });
            // Retry after a short delay in case DOM is not fully loaded
            setTimeout(() => {
                this.renderHistoryTopics();
            }, 100);
            return;
        }
        
        console.log('DEBUG: historyTopicsGrid found, rendering topics...');
        topicsGrid.innerHTML = '';

        this.historyTopics.forEach(topic => {
            let completedLessons, totalLessons, progress;
            
            if (this.currentUser) {
                // Use server-saved progress for authenticated users
                const topicProgress = this.userProgress[topic.id] || {};
                completedLessons = Object.values(topicProgress).filter(lesson => lesson.completed).length;
                totalLessons = topic.lessonCount;
                progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
            } else {
                // Use local storage progress for non-authenticated users
                completedLessons = this.completedLessons.filter(lessonKey => 
                    lessonKey.startsWith(`${topic.id}-`)
                ).length;
                totalLessons = topic.lessonCount;
                progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
            }

            const topicCard = document.createElement('div');
            topicCard.className = `topic-card ${completedLessons === totalLessons ? 'completed' : ''}`;
            topicCard.innerHTML = `
                <div class="topic-header">
                    <div class="topic-icon" style="background: ${topic.color}">
                        ${topic.icon}
                    </div>
                    <div class="topic-info">
                        <h3>${topic.title}</h3>
                        <div class="difficulty">${this.getDynamicDifficulty(topic.id)}</div>
                    </div>
                </div>
                <p class="topic-description">${topic.description}</p>
                <div class="topic-stats">
                    <div class="topic-progress">
                        <span>${completedLessons}/${totalLessons} lessons</span>
                        <div class="progress-indicator">
                            <div class="progress-indicator-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <button class="btn primary" data-topic-id="${topic.id}">Start Learning</button>
                </div>
            `;

            topicsGrid.appendChild(topicCard);
        });

        // Event delegation for Start Learning buttons
        topicsGrid.onclick = (e) => {
            const btn = e.target.closest('.btn.primary');
            if (btn) {
                const topicId = btn.getAttribute('data-topic-id');
                const topic = this.historyTopics.find(t => t.id === topicId);
                if (topic) {
                    this.selectHistoryTopic(topic);
                } else {
                    console.error('Topic not found: ' + topicId);
                }
            }
        };
        
        // Add auth prompt for non-authenticated users (smaller and less intrusive)
        if (!this.currentUser) {
            const authPrompt = document.createElement('div');
            authPrompt.className = 'auth-prompt-small';
            authPrompt.innerHTML = `
                <div class="auth-prompt-content-small">
                    <p>💡 <strong>Tip:</strong> <a href="#" onclick="app.showAuthScreen(); return false;">Sign up</a> to save progress across devices</p>
                </div>
            `;
            topicsGrid.appendChild(authPrompt);
        }
        
        console.log('DEBUG: History topics rendered successfully');
    }

    selectTopic(topic) {
        this.currentTopic = topic;
        
        // Find the first uncompleted lesson for this topic
        let firstUncompletedLesson = 0;
        
        if (this.currentUser) {
            // Use server-saved progress for authenticated users
            const topicProgress = this.userProgress[topic.id] || {};
            for (let i = 0; i < topic.lessonCount; i++) {
                const lessonKey = `lesson-${i}`;
                if (!topicProgress[lessonKey] || !topicProgress[lessonKey].completed) {
                    firstUncompletedLesson = i;
                    break;
                }
            }
        } else {
            // Use local storage progress for non-authenticated users
            for (let i = 0; i < topic.lessonCount; i++) {
                const lessonKey = `${topic.id}-${i}`;
                if (!this.completedLessons.includes(lessonKey)) {
                    firstUncompletedLesson = i;
                    break;
                }
            }
        }
        
        this.currentLesson = firstUncompletedLesson;
        this.showLesson();
    }

    selectHistoryTopic(topic) {
        console.log('selectHistoryTopic called with:', topic);
        this.currentTopic = topic;
        
        // Find the first uncompleted lesson for this topic
        let firstUncompletedLesson = 0;
        
        if (this.currentUser) {
            // Use server-saved progress for authenticated users
            const topicProgress = this.userProgress[topic.id] || {};
            for (let i = 0; i < topic.lessonCount; i++) {
                const lessonKey = `lesson-${i}`;
                if (!topicProgress[lessonKey] || !topicProgress[lessonKey].completed) {
                    firstUncompletedLesson = i;
                    break;
                }
            }
        } else {
            // Use local storage progress for non-authenticated users
            for (let i = 0; i < topic.lessonCount; i++) {
                const lessonKey = `${topic.id}-${i}`;
                if (!this.completedLessons.includes(lessonKey)) {
                    firstUncompletedLesson = i;
                    break;
                }
            }
        }
        
        this.currentLesson = firstUncompletedLesson;
        console.log('About to call showHistoryLesson with lesson:', this.currentLesson);
        this.showHistoryLesson();
    }

    generateLesson(topicId, lessonIndex) {
        const cacheKey = `${topicId}-${lessonIndex}`;
        if (this.generatedQuestions[cacheKey]) {
            return this.generatedQuestions[cacheKey];
        }
        
        const topic = this.historyTopics.find(t => t.id === topicId);
        
        // Define field notes for specific topics and lessons
        const culturalNotesData = {
            'icail': {
                0: [{
                    title: 'ICAIL Conference History',
                    content: 'ICAIL was established in 1987 as the premier international conference for AI & Law research. It has been held biennially since then, bringing together researchers from around the world to present cutting-edge work in legal AI.'
                }],
                1: [{
                    title: 'Research Areas at ICAIL',
                    content: 'ICAIL covers diverse research areas including legal reasoning, natural language processing for legal texts, legal knowledge representation, computational models of legal argumentation, and AI applications in legal practice.'
                }]
            },
            'jurix': {
                0: [{
                    title: 'JURIX Conference Focus',
                    content: 'JURIX is the annual European conference on Legal Knowledge and Information Systems, established in 1988. It focuses on legal informatics and the application of AI techniques to legal problems, with a strong emphasis on European legal systems.'
                }],
                1: [{
                    title: 'European AI & Law Community',
                    content: 'JURIX serves as the primary forum for the European AI & Law research community, fostering collaboration between researchers, practitioners, and policymakers across Europe.'
                }]
            },
            'journal': {
                0: [{
                    title: 'Journal of AI and Law Impact',
                    content: 'The Journal of AI and Law, published by Springer since 1992, is the leading academic journal in the field. It publishes high-quality research articles, surveys, and case studies that advance our understanding of AI applications in law.'
                }]
            },
            'history': {
                0: [{
                    title: 'Early AI & Law Systems',
                    content: 'The field of AI & Law emerged in the 1970s with early systems like TAXMAN, which focused on tax law reasoning. These pioneering systems demonstrated the potential for AI to assist with legal analysis and decision-making.'
                }],
                1: [{
                    title: 'Evolution of AI & Law',
                    content: 'The field has evolved from rule-based expert systems to incorporate machine learning, natural language processing, and more sophisticated AI techniques. This evolution reflects broader trends in artificial intelligence research.'
                }]
            },
            'academics': {
                0: [{
                    title: 'Pioneers of AI & Law',
                    content: 'The field of AI & Law has been shaped by pioneering researchers like L. Thorne McCarty and N. Sridharan (TAXMAN), Edwina Rissland (HYPO, CABARET), and others who developed foundational systems that established the basis for modern legal AI applications.'
                }],
                1: [{
                    title: 'Key Academic Contributions',
                    content: 'Leading academics like Henry Prakken (Logical Tools for Modelling Legal Argument), Kevin Ashley (CATO), Trevor Bench-Capon (value-based argumentation), and Giovanni Sartor have made significant contributions that continue to influence the field today.'
                }]
            },
            'cbr': {
                0: [{
                    title: 'Case-Based Reasoning in Legal AI',
                    content: 'Case-Based Reasoning (CBR) is particularly well-suited for legal applications because legal reasoning often involves comparing current cases to past precedents. CBR systems can help legal professionals find relevant cases and understand how similar situations were resolved.'
                }],
                1: [{
                    title: 'CBR Applications in Law',
                    content: 'CBR has been successfully applied to various legal domains including contract analysis, legal document retrieval, and decision support systems. The ability to handle complex, ill-structured problems makes CBR valuable for legal reasoning tasks.'
                }]
            }
        };
        
        // Handle different lesson templates for academics module
        let templateKey = topicId;
        if (topicId === 'academics' && lessonIndex === 1) {
            templateKey = 'academics-lesson-1';
        } else if (topicId === 'academics' && lessonIndex === 2) {
            templateKey = 'academics-lesson-2';
        } else if (topicId === 'icail' && lessonIndex === 1) {
            templateKey = 'icail-lesson-1';
        } else if (topicId === 'icail' && lessonIndex === 2) {
            templateKey = 'icail-lesson-2';
        } else if (topicId === 'jurix' && lessonIndex === 1) {
            templateKey = 'jurix-lesson-1';
        } else if (topicId === 'jurix' && lessonIndex === 2) {
            templateKey = 'jurix-lesson-2';
        } else if (topicId === 'journal' && lessonIndex === 1) {
            templateKey = 'journal-lesson-1';
        } else if (topicId === 'journal' && lessonIndex === 2) {
            templateKey = 'journal-lesson-2';
        } else if (topicId === 'history' && lessonIndex === 1) {
            templateKey = 'history-lesson-1';
        } else if (topicId === 'history' && lessonIndex === 2) {
            templateKey = 'history-lesson-2';
        } else if (topicId === 'cbr' && lessonIndex === 1) {
            templateKey = 'cbr-lesson-1';
        } else if (topicId === 'cbr' && lessonIndex === 2) {
            templateKey = 'cbr-lesson-2';
        }
        
        const templates = this.questionTemplates[templateKey];
        
        // Debug logging
        console.log(`DEBUG: topicId=${topicId}, lessonIndex=${lessonIndex}, templateKey=${templateKey}`);
        console.log(`DEBUG: Available template keys:`, Object.keys(this.questionTemplates));
        console.log(`DEBUG: templates for ${templateKey}:`, templates);
        
        // Ensure templates is always an array
        if (!templates || !Array.isArray(templates)) {
            console.error(`DEBUG: No templates found for ${templateKey}, using fallback`);
            return {
                title: topic ? topic.title : 'Lesson',
                questions: [{
                    type: 'multiple-choice',
                    question: `No questions available for ${templateKey}.`,
                    options: ['Please contact support.'],
                    correct: 0,
                    explanation: `Template key '${templateKey}' not found.`
                }],
                culturalNotes: culturalNotesData[topicId]?.[lessonIndex] || []
            };
        }
        
        // --- AI & LAW TOPICS ---
        // For topics that don't fit the AI & Law pattern, use a more sophisticated randomization
        const questions = [];
        const questionsNeeded = topic.questionsPerLesson;
        const usedQuestions = new Set();
        
        for (let i = 0; i < questionsNeeded; i++) {
            const template = templates[i % templates.length];
            const availableAnswers = [...template.answers];
            
            // Filter out already used questions to avoid repetition
            const unusedAnswers = availableAnswers.filter(answer => {
                const questionKey = `${template.template}-${answer.text || answer.english}`;
                return !usedQuestions.has(questionKey);
            });
            
            if (unusedAnswers.length === 0) {
                usedQuestions.clear();
            }
            
            const answersToUse = unusedAnswers.length > 0 ? unusedAnswers : availableAnswers;
            const shuffledAnswers = this.shuffleArray(answersToUse);
            const selectedAnswer = shuffledAnswers[0];
            const questionKey = `${template.template}-${selectedAnswer.text || selectedAnswer.english}`;
            usedQuestions.add(questionKey);
            
            const otherAnswers = availableAnswers.filter(answer => 
                (answer.text || answer.english) !== (selectedAnswer.text || selectedAnswer.english)
            );
            const shuffledOtherAnswers = this.shuffleArray(otherAnswers);
            const wrongOptions = shuffledOtherAnswers.slice(0, 3).map(answer => answer.text || answer.english);
            
            const questionText = template.template.replace('{english}', selectedAnswer.text || selectedAnswer.english);
            const correctAnswer = selectedAnswer.text || selectedAnswer.english;
            const allOptions = [correctAnswer, ...wrongOptions];
            const shuffledOptions = this.shuffleArray(allOptions);
            const correctIndex = shuffledOptions.indexOf(correctAnswer);
            
            const questionData = {
                type: 'multiple-choice',
                question: questionText,
                options: shuffledOptions,
                correct: correctIndex,
                explanation: selectedAnswer.explanation
            };
            
            questions.push(questionData);
        }
        
        // Fallback: if no questions, add a dummy error question
        if (questions.length === 0) {
            questions.push({
                type: 'multiple-choice',
                question: 'No questions available for this lesson. Please contact support.',
                options: ['Error'],
                correct: 0,
                explanation: 'No data.'
            });
        }
        
        this.generatedQuestions[cacheKey] = {
            title: `Lesson ${lessonIndex + 1}`,
            questions,
            culturalNotes: culturalNotesData[topicId]?.[lessonIndex] || []
        };
        return this.generatedQuestions[cacheKey];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    showLesson() {
        document.getElementById('topicsSection').classList.add('hidden');
        document.getElementById('lessonSection').classList.remove('hidden');
        document.getElementById('resultsSection').classList.add('hidden');

        // Generate or retrieve the lesson
        const lesson = this.generateLesson(this.currentTopic.id, this.currentLesson);
        if (!lesson) {
            console.error('Failed to generate lesson');
            return;
        }

        document.getElementById('lessonTitle').textContent = lesson.title;
        document.getElementById('totalQuestions').textContent = lesson.questions.length;
        
        this.currentQuestion = 0;
        this.userAnswers = new Array(lesson.questions.length).fill(null);
        this.correctAnswers = 0;
        this.totalQuestions = lesson.questions.length;
        
        this.renderQuestion();
        this.updateNavigation();
        
        // Rebind the Next button event listener to ensure it works
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            // Remove any existing listeners
            nextBtn.replaceWith(nextBtn.cloneNode(true));
            const newNextBtn = document.getElementById('nextBtn');
            newNextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Add Field Notes button if notes exist
        if (lesson.culturalNotes && lesson.culturalNotes.length > 0) {
            const notesBtn = document.createElement('button');
            notesBtn.className = 'btn cultural-notes-btn';
            notesBtn.innerHTML = '<i class="fas fa-info-circle"></i> Field Notes';
            notesBtn.onclick = () => {
                notesBox.classList.toggle('hidden');
            };
            document.getElementById('lessonContent').appendChild(notesBtn);
            // Info box
            const notesBox = document.createElement('div');
            notesBox.className = 'cultural-notes-box hidden';
            notesBox.innerHTML = lesson.culturalNotes.map(note => `
                <h4>${note.title}</h4>
                <p>${note.content}</p>
            `).join('');
            document.getElementById('lessonContent').appendChild(notesBox);
        }
    }

    renderQuestion() {
        const lesson = this.generateLesson(this.currentTopic.id, this.currentLesson);
        const question = lesson.questions[this.currentQuestion];
        const lessonContent = document.getElementById('lessonContent');
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;

        let questionHTML = `
            <div class="question">
                <h3>Question ${this.currentQuestion + 1}</h3>
                <div class="question-text">${question.question}</div>
        `;

        if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
            questionHTML += '<div class="options">';
            question.options.forEach((option, index) => {
                const isSelected = this.userAnswers[this.currentQuestion] === index;
                const isCorrect = this.userAnswers[this.currentQuestion] !== null && index === question.correct;
                const isIncorrect = this.userAnswers[this.currentQuestion] !== null && this.userAnswers[this.currentQuestion] === index && this.userAnswers[this.currentQuestion] !== question.correct;
                questionHTML += `
                    <div class="option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}" data-index="${index}">
                        <div class="option-radio"></div>
                        <span>${option}</span>
                    </div>
                `;
            });
            questionHTML += '</div>';
        }

        questionHTML += '</div>';
        lessonContent.innerHTML = questionHTML;
        // Add event listeners for options
        const options = lessonContent.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => this.selectOption(option));
        });
    }

    selectOption(optionElement) {
        const options = optionElement.parentElement.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        optionElement.classList.add('selected');
    }

    checkAnswer() {
        console.log('checkAnswer called');
        console.log('DEBUG: currentQuestion index:', this.currentQuestion);
        
        const lesson = this.generateLesson(this.currentTopic.id, this.currentLesson);
        console.log('DEBUG: Total questions in lesson:', lesson.questions.length);
        console.log('DEBUG: All questions in lesson:', lesson.questions.map((q, i) => `${i}: ${q.question}`));
        
        const question = lesson.questions[this.currentQuestion];
        
        console.log('DEBUG: Current question being checked:', {
            questionText: question.question,
            explanation: question.explanation,
            correctAnswer: question.options[question.correct],
            questionIndex: this.currentQuestion
        });
        
        let isCorrect = false;
        let hasAnswer = false;

        // Get the correct content container
        const contentContainer = this.currentSection === 'history' 
            ? document.getElementById('historyLessonContent')
            : document.getElementById('lessonContent');

        console.log('Content container found:', !!contentContainer);
        console.log('Current section:', this.currentSection);

        if (!contentContainer) {
            console.error('Content container not found!');
            this.showMessage('Error: Content container not found. Please refresh the page.', 'error');
            return;
        }

        if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
            const selectedOption = contentContainer.querySelector('.option.selected');
            console.log('Selected option found:', !!selectedOption);
            
            if (selectedOption) {
                hasAnswer = true;
                const selectedIndex = parseInt(selectedOption.dataset.index);
                isCorrect = selectedIndex === question.correct;
                console.log('Answer processed:', { selectedIndex, correct: question.correct, isCorrect });
                
                // Store the answer
                this.userAnswers[this.currentQuestion] = selectedIndex;
                
                // Show correct/incorrect feedback
                const options = contentContainer.querySelectorAll('.option');
                options.forEach((option, index) => {
                    if (index === question.correct) {
                        option.classList.add('correct');
                    } else if (index === selectedIndex && !isCorrect) {
                        option.classList.add('incorrect');
                    }
                });
            } else {
                // Fallback: try to find any selected option in the document
                const anySelectedOption = document.querySelector('.option.selected');
                if (anySelectedOption) {
                    console.log('Found selected option in document fallback');
                    hasAnswer = true;
                    const selectedIndex = parseInt(anySelectedOption.dataset.index);
                    isCorrect = selectedIndex === question.correct;
                    this.userAnswers[this.currentQuestion] = selectedIndex;
                    
                    // Show correct/incorrect feedback
                    const options = document.querySelectorAll('.option');
                    options.forEach((option, index) => {
                        if (index === question.correct) {
                            option.classList.add('correct');
                        } else if (index === selectedIndex && !isCorrect) {
                            option.classList.add('incorrect');
                        }
                    });
                }
            }
        }

        console.log('Has answer:', hasAnswer);

        // If no answer was provided, don't proceed
        if (!hasAnswer) {
            console.log('No answer found, showing warning message');
            this.showMessage('Please select an answer before continuing.', 'warning');
            return;
        }

        console.log('Showing feedback for answer');
        // Show feedback popup with explanation
        this.showFeedback(isCorrect, question);
    }

    showFeedback(isCorrect, question) {
        console.log('showFeedback called with:', { isCorrect, question: question.question, section: this.currentSection });
        
        // Disable the next button to prevent multiple clicks
        const nextBtn = this.currentSection === 'history' 
            ? document.getElementById('historyNextBtn')
            : document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = true;

        // Find the question container with better error handling
        let questionContainer;
        if (this.currentSection === 'history') {
            const historyContent = document.getElementById('historyLessonContent');
            console.log('History content found:', !!historyContent);
            questionContainer = historyContent ? historyContent.querySelector('.question') : null;
        } else {
            const lessonContent = document.getElementById('lessonContent');
            console.log('Lesson content found:', !!lessonContent);
            questionContainer = lessonContent ? lessonContent.querySelector('.question') : null;
        }

        console.log('Question container found:', !!questionContainer);

        if (!questionContainer) {
            console.error('Question container not found. Section:', this.currentSection);
            console.error('Current question:', this.currentQuestion);
            
            // Fallback: try to find any question container
            const allQuestions = document.querySelectorAll('.question');
            console.log('All questions found:', allQuestions.length);
            if (allQuestions.length > 0) {
                questionContainer = allQuestions[0];
                console.log('Using fallback question container');
            } else {
                console.error('No question containers found at all');
                // Fallback to popup approach
                this.showFallbackFeedback(isCorrect, question);
                return;
            }
        }

        // Remove any existing explanation sections first
        const existingExplanation = questionContainer.querySelector('.explanation-section');
        if (existingExplanation) {
            questionContainer.removeChild(existingExplanation);
        }

        // Create explanation section
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation-section';
        explanationDiv.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background: ${isCorrect ? '#e8f5e8' : '#ffe8e8'};
            border: 2px solid ${isCorrect ? '#4CAF50' : '#f44336'};
            animation: explanationSlideIn 0.4s ease-out;
        `;

        // Add explanation to question container
        let correctAnswerText = '';
        if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
            correctAnswerText = question.options[question.correct];
        }
        
        explanationDiv.innerHTML = `
            <div class="explanation-content">
                <div class="explanation-header">
                    <span class="explanation-icon">${isCorrect ? '✓' : '✗'}</span>
                    <h4 style="margin: 0; color: ${isCorrect ? '#2e7d32' : '#c62828'}">
                        ${isCorrect ? 'Correct!' : 'Incorrect'}
                    </h4>
                </div>
                ${!isCorrect ? `<p><strong>Correct Answer:</strong> ${correctAnswerText}</p>` : ''}
                <p><strong>Explanation:</strong> ${question.explanation}</p>
                <button class="continue-btn" style="
                    background: ${isCorrect ? '#4CAF50' : '#f44336'};
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 500;
                ">Continue to Next Question</button>
            </div>
        `;

        // Add explanation to question container
        questionContainer.appendChild(explanationDiv);
        console.log('Explanation added to question container');

        // Handle continue button click
        const continueBtn = explanationDiv.querySelector('.continue-btn');
        continueBtn.addEventListener('click', () => {
            console.log('Continue button clicked');
            explanationDiv.style.animation = 'explanationSlideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (questionContainer.contains(explanationDiv)) {
                    questionContainer.removeChild(explanationDiv);
                }
                if (nextBtn) nextBtn.disabled = false;
                
                // Now move to the next question
                if (this.currentSection === 'history') {
                    this.moveToNextHistoryQuestion();
                } else {
                    this.moveToNextQuestion();
                }
            }, 300);
        });
    }

    // Fallback feedback function using popup
    showFallbackFeedback(isCorrect, question) {
        const nextBtn = this.currentSection === 'history' 
            ? document.getElementById('historyNextBtn')
            : document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = true;

        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-overlay';
        let correctAnswerText = '';
        if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
            correctAnswerText = question.options[question.correct];
        }

        feedbackDiv.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
                <div class="feedback-text">
                    <h3>${isCorrect ? 'Correct!' : 'Incorrect'}</h3>
                    ${!isCorrect ? `<p><strong>Correct Answer:</strong> ${correctAnswerText}</p>` : ''}
                    <p><strong>Explanation:</strong> ${question.explanation}</p>
                    <button class="continue-btn">Continue to Next Question</button>
                </div>
            </div>
        `;

        feedbackDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${isCorrect ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            font-weight: 500;
            z-index: 1000;
            animation: feedbackSlideIn 0.4s ease-out;
            max-width: 450px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(feedbackDiv);

        // Handle continue button click
        const continueBtn = feedbackDiv.querySelector('.continue-btn');
        continueBtn.addEventListener('click', () => {
            feedbackDiv.style.animation = 'feedbackSlideOut 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(feedbackDiv);
                if (nextBtn) nextBtn.disabled = false;
                
                // Now move to the next question
                if (this.currentSection === 'history') {
                    this.moveToNextHistoryQuestion();
                } else {
                    this.moveToNextQuestion();
                }
            }, 300);
        });
    }

    // Simple function to move to next question (no answer checking)
    moveToNextQuestion() {
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        } else {
            this.showResults();
        }
        this.updateNavigation();
    }

    // Simple function to move to next history question (no answer checking)
    moveToNextHistoryQuestion() {
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.renderHistoryQuestion();
        }
    }

    nextQuestion() {
        // Only check answer if it hasn't been answered yet
        if (this.userAnswers[this.currentQuestion] === null) {
            // Check the answer first
            this.checkAnswer();
            return; // Exit early, checkAnswer will handle the next step via feedback popup
        }
        
        // User has already answered, proceed to next question
        this.moveToNextQuestion();
    }

    nextHistoryQuestion() {
        // Only check answer if it hasn't been answered yet
        if (this.userAnswers[this.currentQuestion] === null) {
            // Check the answer first
            this.checkAnswer();
            return; // Exit early, checkAnswer will handle the next step via feedback popup
        }
        
        // User has already answered, proceed to next question
        this.moveToNextHistoryQuestion();
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuestion();
        }
        this.updateNavigation();
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        prevBtn.disabled = this.currentQuestion === 0;
        
        if (this.currentQuestion === this.totalQuestions - 1) {
            nextBtn.textContent = 'Finish';
            nextBtn.innerHTML = 'Finish <i class="fas fa-check"></i>';
        } else {
            nextBtn.textContent = 'Next';
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        }
    }

    showResults() {
        document.getElementById('lessonSection').classList.add('hidden');
        document.getElementById('resultsSection').classList.remove('hidden');

        // Calculate correct answers from userAnswers array
        this.correctAnswers = 0;
        const lesson = this.generateLesson(this.currentTopic.id, this.currentLesson);
        
        for (let i = 0; i < this.userAnswers.length; i++) {
            const userAnswer = this.userAnswers[i];
            const question = lesson.questions[i];
            
            if (userAnswer !== null) {
                if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
                    if (userAnswer === question.correct) {
                        this.correctAnswers++;
                    }
                }
            }
        }

        const percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        document.getElementById('correctAnswers').textContent = this.correctAnswers;
        document.getElementById('totalAnswers').textContent = this.totalQuestions;

        // Calculate points earned
        const pointsPerCorrect = 5;
        const completionBonus = percentage >= 70 ? 10 : 0;
        const pointsEarned = (this.correctAnswers * pointsPerCorrect) + completionBonus;

        // Update results display to show points earned
        const resultsContent = document.querySelector('#resultsSection .results-content');
        const existingPointsDisplay = resultsContent.querySelector('.points-earned-display');
        if (existingPointsDisplay) {
            existingPointsDisplay.remove();
        }

        if (this.currentUser && pointsEarned > 0) {
            const pointsDisplay = document.createElement('div');
            pointsDisplay.className = 'points-earned-display';
            pointsDisplay.innerHTML = `
                <div class="points-summary">
                    <h3>🎯 Points Earned</h3>
                    <div class="points-breakdown">
                        <div class="points-item">
                            <span class="points-label">Correct Answers:</span>
                            <span class="points-value">+${this.correctAnswers * pointsPerCorrect} points</span>
                        </div>
                        ${completionBonus > 0 ? `
                        <div class="points-item bonus">
                            <span class="points-label">Completion Bonus:</span>
                            <span class="points-value">+${completionBonus} points</span>
                        </div>
                        ` : ''}
                        <div class="points-item total">
                            <span class="points-label">Total Points:</span>
                            <span class="points-value">+${pointsEarned} points</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Insert after score display
            const scoreDisplay = resultsContent.querySelector('.score-display');
            scoreDisplay.parentNode.insertBefore(pointsDisplay, scoreDisplay.nextSibling);
        }

        // Mark lesson as completed if score is good enough (70% or higher)
        if (percentage >= 70) {
            const lessonKey = `${this.currentTopic.id}-${this.currentLesson}`;
            
            // Save to localStorage only for guest users
            if (!this.currentUser) {
                if (!this.completedLessons.includes(lessonKey)) {
                    this.completedLessons.push(lessonKey);
                    localStorage.setItem('completedLessons', JSON.stringify(this.completedLessons));
                    this.loadGuestProgress(); // Reload to ensure sync
                    this.updateProgress();
                } else {
                    this.updateProgress();
                }
            }
            
            // Save progress to server for authenticated users
            if (this.currentUser) {
                this.saveProgress(
                    this.currentTopic.id, 
                    `lesson-${this.currentLesson}`, 
                    true, 
                    this.correctAnswers, 
                    this.totalQuestions
                );
            }
        } else {
            // Save attempt even if not completed (only for authenticated users)
            if (this.currentUser) {
                this.saveProgress(
                    this.currentTopic.id, 
                    `lesson-${this.currentLesson}`, 
                    false, 
                    this.correctAnswers, 
                    this.totalQuestions
                );
            }
        }

        // Show/hide next lesson button based on available lessons
        const nextLessonBtn = document.getElementById('nextLessonBtn');
        if (this.currentLesson < this.currentTopic.lessonCount - 1) {
            nextLessonBtn.style.display = 'flex';
        } else {
            nextLessonBtn.style.display = 'none';
        }
    }

    retryLesson() {
        // Clear the cached lesson to generate new questions
        const cacheKey = `${this.currentTopic.id}-${this.currentLesson}`;
        delete this.generatedQuestions[cacheKey];
        this.showLesson();
    }

    nextLesson() {
        if (this.currentLesson < this.currentTopic.lessonCount - 1) {
            this.currentLesson++;
            this.showLesson();
        }
    }

    showTopics() {
        // Only switch section, do not set pageTitle or pageSubtitle here
        this.switchSection('history');
    }

    showHistoryTopics() {
        // Hide all sections first
        document.getElementById('historyTopicsSection').classList.remove('hidden');
        document.getElementById('historyLessonSection').classList.add('hidden');
        document.getElementById('historyResultsSection').classList.add('hidden');
        
        // Re-render history topics
        this.renderHistoryTopics();
    }

    updateProgress() {
        const allTopics = [...this.historyTopics];
        const totalLessons = allTopics.reduce((sum, topic) => sum + topic.lessonCount, 0);
        if (this.currentUser) {
            // Use server-saved progress (unchanged)
            const completedCount = Object.values(this.userProgress).reduce((sum, topicProgress) => {
                return sum + Object.values(topicProgress).filter(lesson => lesson.completed).length;
            }, 0);
            const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
            document.getElementById('completedLessons').textContent = completedCount;
            document.getElementById('totalLessons').textContent = totalLessons;
            document.getElementById('progressText').textContent = `${Math.round(progressPercentage)}%`;
            document.getElementById('progressCircle').style.width = `${progressPercentage}%`;
        } else {
            // Use new guest progress logic
            let completedCount = 0;
            let progress = {};
            try {
                progress = JSON.parse(localStorage.getItem('completedLessons')) || {};
            } catch (e) { progress = {}; }
            for (const topicId in progress) {
                if (Array.isArray(progress[topicId])) {
                    completedCount += progress[topicId].length;
                }
            }
            const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
            document.getElementById('completedLessons').textContent = completedCount;
            document.getElementById('totalLessons').textContent = totalLessons;
            document.getElementById('progressText').textContent = `${Math.round(progressPercentage)}%`;
            document.getElementById('progressCircle').style.width = `${progressPercentage}%`;
        }
    }

    // Authentication methods
    async registerUser(username, email, password) {
        console.log('DEBUG: registerUser called with API_BASE_URL:', this.API_BASE_URL);
        try {
            const response = await fetch(`${this.API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password })
            });
            
            console.log('DEBUG: Registration response status:', response.status);
            
            const data = await response.json();
            console.log('DEBUG: Registration response data:', data);
            
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('DEBUG: Registration error:', error);
            return { success: false, error: 'Network error' };
        }
    }

    async loginUser(username, password) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const data = await response.json();
                this.currentUser = data.user;
                await this.mergeGuestProgressToUser(); // Merge guest progress on login
                await this.loadUserProgress();
                await this.loadUserStats(); // Load user stats for leaderboard
                this.updateAuthButton(); // Update the auth button
                // Close the auth modal
                const authModal = document.getElementById('authModal');
                if (authModal) {
                    authModal.classList.add('hidden');
                }
                // Refresh the current section to show updated content
                this.switchSection(this.currentSection);
                this.showMessage('Login successful!', 'success');
                return { success: true, data };
            } else {
                const errorData = await response.json();
                this.showMessage(errorData.error || 'Login failed', 'error');
                return { success: false, error: errorData.error || 'Login failed' };
            }
        } catch (error) {
            this.showMessage('Login failed', 'error');
            return { success: false, error: 'Login failed' };
        }
    }

    async mergeGuestProgressToUser() {
        // Merge guest progress from localStorage into user account
        const guestLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
        for (const lessonKey of guestLessons) {
            // lessonKey format: "topicId-lessonIndex"
            const [topicId, lessonIndex] = lessonKey.split('-');
            // Save as completed with default score (100%) and 1 question (or adjust as needed)
            await this.saveProgress(topicId, `lesson-${lessonIndex}`, true, 100, 1);
        }
        // Clear guest progress after merging
        localStorage.removeItem('completedLessons');
    }

    async logoutUser() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                // Clear user data but preserve guest progress
                this.currentUser = null;
                this.userProgress = {};
                localStorage.removeItem('userData');
                localStorage.removeItem('userProgress');
                
                // Load guest progress from localStorage
                this.completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
                
                // Reset progress display to use local storage
                this.updateProgress();
                
                // Update the auth button
                this.updateAuthButton();
                
                // Force reset the UI state - hide all sections and show only the main topics
                this.resetUIAfterLogout();
                
                // Show success message
                this.showMessage('Successfully logged out', 'success');
            }
        } catch (error) {
            console.error('Logout error:', error);
            this.showMessage('Logout failed', 'error');
        }
    }

    resetUIAfterLogout() {
        console.log('DEBUG: resetUIAfterLogout called');
        
        // Hide all content sections
        const historySection = document.getElementById('historySection');
        const leaderboardSection = document.getElementById('leaderboardSection');
        
        console.log('DEBUG: Found sections - historySection:', historySection, 'leaderboardSection:', leaderboardSection);
        
        if (historySection) historySection.classList.add('hidden');
        if (leaderboardSection) leaderboardSection.classList.add('hidden');
        
        // Reset navigation tabs
        const historyTab = document.getElementById('historyTab');
        const leaderboardTab = document.getElementById('leaderboardTab');
        
        console.log('DEBUG: Found tabs - historyTab:', historyTab, 'leaderboardTab:', leaderboardTab);
        
        if (historyTab) historyTab.classList.remove('active');
        if (leaderboardTab) leaderboardTab.classList.remove('active');
        
        // Show the main topics section and activate its tab
        if (historySection) historySection.classList.remove('hidden');
        if (historyTab) historyTab.classList.add('active');
        
        // Update current section state
        this.currentSection = 'history';
        
        console.log('DEBUG: After reset - historySection hidden:', historySection ? historySection.classList.contains('hidden') : 'null');
        console.log('DEBUG: After reset - historyTab active:', historyTab ? historyTab.classList.contains('active') : 'null');
        
        // Reset user stats display for guest users
        const currentStreakElement = document.getElementById('currentStreak');
        const totalPointsElement = document.getElementById('totalPoints');
        if (currentStreakElement) currentStreakElement.textContent = '0';
        if (totalPointsElement) totalPointsElement.textContent = '0';
        
        // Clear leaderboard display
        this.clearLeaderboardDisplay();
        
        // Clear achievements display
        this.clearAchievementsDisplay();
        
        // Re-render the topics to show guest interface
        this.renderHistoryTopics();
        
        console.log('DEBUG: resetUIAfterLogout completed');
    }

    clearUserData() {
        this.currentUser = null;
        this.userProgress = {};
        // Also clear any cached user data from localStorage if it exists
        localStorage.removeItem('userData');
        localStorage.removeItem('userProgress');
        // Don't clear completedLessons here - preserve guest progress
    }

    async checkAuthStatus() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/user`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                this.currentUser = data.user;
                await this.loadUserProgress();
                return true;
            } else {
                // Clear any cached user data if authentication fails
                this.clearUserData();
                return false;
            }
        } catch (error) {
            // Clear any cached user data if there's a network error
            this.clearUserData();
            return false;
        }
    }

    async loadUserProgress() {
        if (!this.currentUser) {
            console.log('DEBUG: No current user, skipping progress load');
            return;
        }
        try {
            const response = await fetch(`${this.API_BASE_URL}/progress`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                this.userProgress = {};
                data.progress.forEach(item => {
                    if (!this.userProgress[item.topic_id]) {
                        this.userProgress[item.topic_id] = {};
                    }
                    this.userProgress[item.topic_id][item.lesson_id] = {
                        completed: item.completed,
                        score: item.score,
                        total_questions: item.total_questions,
                        last_accessed: item.last_accessed
                    };
                });
                this.updateProgress();
            } else {
                const errorData = await response.json();
                console.error('DEBUG: Progress load failed:', errorData);
            }
        } catch (error) {
            console.error('DEBUG: Failed to load progress:', error);
        }
    }

    async saveProgress(topicId, lessonId, completed, score, totalQuestions) {
        if (!this.currentUser) {
            console.log('DEBUG: No current user, skipping progress save');
            return;
        }
        
        console.log(`DEBUG: Attempting to save progress - Topic: ${topicId}, Lesson: ${lessonId}, Completed: ${completed}, Score: ${score}/${totalQuestions}`);
        console.log('DEBUG: Current user:', this.currentUser);
        
        try {
            const response = await fetch(`${this.API_BASE_URL}/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    topic_id: topicId,
                    lesson_id: lessonId,
                    completed: completed,
                    score: score,
                    total_questions: totalQuestions
                })
            });
            
            console.log(`DEBUG: Progress save response status: ${response.status}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('DEBUG: Progress saved successfully:', data);
                
                // Update local progress
                if (!this.userProgress[topicId]) {
                    this.userProgress[topicId] = {};
                }
                this.userProgress[topicId][lessonId] = {
                    completed: completed,
                    score: score,
                    total_questions: totalQuestions,
                    last_accessed: new Date().toISOString()
                };
                
                console.log('DEBUG: Updated local progress:', this.userProgress);
                
                // Update the UI to reflect the new progress
                this.updateProgress();
                this.renderTopics();
                this.renderHistoryTopics();
            } else {
                const errorData = await response.json();
                console.error('DEBUG: Progress save failed:', errorData);
            }
        } catch (error) {
            console.error('DEBUG: Failed to save progress:', error);
        }
    }

    showAuthScreen() {
        // Show the existing auth modal instead of replacing content
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.classList.remove('hidden');
        }
    }

    switchAuthTab(tab) {
        console.log('DEBUG: switchAuthTab called with tab:', tab);
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const loginTab = document.getElementById('loginTab');
        const registerTab = document.getElementById('registerTab');
        
        console.log('DEBUG: Found elements - loginForm:', loginForm, 'registerForm:', registerForm, 'loginTab:', loginTab, 'registerTab:', registerTab);
        
        // Update tab active states
        if (loginTab) loginTab.classList.toggle('active', tab === 'login');
        if (registerTab) registerTab.classList.toggle('active', tab === 'register');
        
        if (tab === 'login') {
            if (loginForm) loginForm.classList.remove('hidden');
            if (registerForm) registerForm.classList.add('hidden');
        } else {
            if (loginForm) loginForm.classList.add('hidden');
            if (registerForm) registerForm.classList.remove('hidden');
        }
        
        console.log('DEBUG: After switching - loginForm hidden:', loginForm ? loginForm.classList.contains('hidden') : 'null', 'registerForm hidden:', registerForm ? registerForm.classList.contains('hidden') : 'null');
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const result = await this.loginUser(username, password);
        
        if (result.success) {
            this.showTopics();
        } else {
            this.showMessage(result.error, 'error');
        }
    }

    async handleRegister(event) {
        console.log('DEBUG: handleRegister called');
        event.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        console.log('DEBUG: Form values - username:', username, 'email:', email, 'password length:', password.length);
        
        const result = await this.registerUser(username, email, password);
        
        console.log('DEBUG: Registration result:', result);
        
        if (result.success) {
            this.showMessage('Registration successful! Please login.', 'success');
            this.switchAuthTab('login');
        } else {
            this.showMessage(result.error, 'error');
        }
    }

    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    showHistoryLesson() {
        console.log('showHistoryLesson called.');
        document.getElementById('historyTopicsSection').classList.add('hidden');
        document.getElementById('historyLessonSection').classList.remove('hidden');
        document.getElementById('historyResultsSection').classList.add('hidden');

        // Generate or retrieve the lesson
        const lesson = this.generateLesson(this.currentTopic.id, this.currentLesson);
        console.log('Lesson generated in showHistoryLesson:', lesson);
        if (!lesson) {
            console.error('Failed to generate lesson');
            return;
        }

        document.getElementById('historyLessonTitle').textContent = lesson.title;
        document.getElementById('historyTotalQuestions').textContent = lesson.questions.length;
        this.currentQuestion = 0;
        this.userAnswers = new Array(lesson.questions.length).fill(null);
        this.correctAnswers = 0;
        this.totalQuestions = lesson.questions.length;
        this.renderHistoryQuestion();
        // this.updateHistoryNavigation();
        
        // Rebind the history Next button event listener to ensure it works
        const historyNextBtn = document.getElementById('historyNextBtn');
        if (historyNextBtn) {
            // Remove any existing listeners
            historyNextBtn.replaceWith(historyNextBtn.cloneNode(true));
            const newHistoryNextBtn = document.getElementById('historyNextBtn');
            newHistoryNextBtn.addEventListener('click', () => this.nextHistoryQuestion());
        }

        // Add Field Notes button if notes exist
        if (lesson.culturalNotes && lesson.culturalNotes.length > 0) {
            const notesBtn = document.createElement('button');
            notesBtn.className = 'btn cultural-notes-btn';
            notesBtn.innerHTML = '<i class="fas fa-info-circle"></i> Field Notes';
            notesBtn.onclick = () => {
                notesBox.classList.toggle('hidden');
            };
            document.getElementById('historyLessonContent').appendChild(notesBtn);
            // Info box
            const notesBox = document.createElement('div');
            notesBox.className = 'cultural-notes-box hidden';
            notesBox.innerHTML = lesson.culturalNotes.map(note => `
                <h4>${note.title}</h4>
                <p>${note.content}</p>
            `).join('');
            document.getElementById('historyLessonContent').appendChild(notesBox);
        }
    }

    renderHistoryQuestion() {
        const lesson = this.generateLesson(this.currentTopic.id, this.currentLesson);
        if (!lesson || !lesson.questions || lesson.questions.length === 0) {
            document.getElementById('historyLessonContent').innerHTML = '<div class="error">No questions available for this lesson. Please contact support.</div>';
            return;
        }
        const question = lesson.questions[this.currentQuestion];
        document.getElementById('historyCurrentQuestion').textContent = this.currentQuestion + 1;

        let questionHTML = `
            <div class="question">
                <h3>Question ${this.currentQuestion + 1}</h3>
                <div class="question-text">${question.question}</div>
        `;

        if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
            questionHTML += '<div class="options">';
            question.options.forEach((option, index) => {
                const isSelected = this.userAnswers[this.currentQuestion] === index;
                const isCorrect = this.userAnswers[this.currentQuestion] !== null && index === question.correct;
                const isIncorrect = this.userAnswers[this.currentQuestion] !== null && this.userAnswers[this.currentQuestion] === index && this.userAnswers[this.currentQuestion] !== question.correct;
                questionHTML += `
                    <div class="option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}" data-index="${index}">
                        <div class="option-radio"></div>
                        <span>${option}</span>
                    </div>
                `;
            });
            questionHTML += '</div>';
        }

        questionHTML += '</div>';
        document.getElementById('historyLessonContent').innerHTML = questionHTML;

        // Bind events only if question hasn't been answered yet
        if (this.userAnswers[this.currentQuestion] === null) {
            if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
                document.getElementById('historyLessonContent').querySelectorAll('.option').forEach(option => {
                    option.addEventListener('click', () => this.selectOption(option));
                });
            }
        }
    }

    previousHistoryQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderHistoryQuestion();
        }
        // Optionally update navigation if you have navigation controls
        // this.updateHistoryNavigation && this.updateHistoryNavigation();
    }

    // New function to advance to next question without checking answer
    advanceQuestion() {
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        } else {
            this.showResults();
        }
        this.updateNavigation();
    }

    // New function to advance to next history question without checking answer
    advanceHistoryQuestion() {
        if (this.currentQuestion < this.totalQuestions - 1) {
            this.currentQuestion++;
            this.renderHistoryQuestion();
        }
    }

    showHistoryResults() {
        document.getElementById('historyLessonSection').classList.add('hidden');
        document.getElementById('historyResultsSection').classList.remove('hidden');

        // Calculate correct answers from userAnswers array
        this.correctAnswers = 0;
        const lesson = this.generateLesson(this.currentTopic.id, this.currentLesson);
        
        for (let i = 0; i < this.userAnswers.length; i++) {
            const userAnswer = this.userAnswers[i];
            const question = lesson.questions[i];
            
            if (userAnswer !== null) {
                if (question.type === 'multiple-choice' || question.type === 'fill-blank') {
                    if (userAnswer === question.correct) {
                        this.correctAnswers++;
                    }
                }
            }
        }

        const percentage = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        
        // PATCH: Add null checks for result elements
        const scoreElem = document.getElementById('historyScorePercentage');
        const correctElem = document.getElementById('historyCorrectAnswers');
        const totalElem = document.getElementById('historyTotalAnswers');
        if (scoreElem) scoreElem.textContent = `${percentage}%`;
        if (correctElem) correctElem.textContent = this.correctAnswers;
        if (totalElem) totalElem.textContent = this.totalQuestions;
        if (!scoreElem || !correctElem || !totalElem) {
            console.warn('One or more history results elements are missing from the DOM.');
        }

        // Calculate points earned
        const pointsPerCorrect = 5;
        const completionBonus = percentage >= 70 ? 10 : 0;
        const pointsEarned = (this.correctAnswers * pointsPerCorrect) + completionBonus;

        // Update results display to show points earned
        const resultsContent = document.querySelector('#historyResultsSection .results-content');
        const existingPointsDisplay = resultsContent ? resultsContent.querySelector('.points-earned-display') : null;
        if (existingPointsDisplay) {
            existingPointsDisplay.remove();
        }

        if (this.currentUser && pointsEarned > 0 && resultsContent) {
            const pointsDisplay = document.createElement('div');
            pointsDisplay.className = 'points-earned-display';
            pointsDisplay.innerHTML = `
                <div class="points-summary">
                    <h3>🎯 Points Earned</h3>
                    <div class="points-breakdown">
                        <div class="points-item">
                            <span class="points-label">Correct Answers:</span>
                            <span class="points-value">+${this.correctAnswers * pointsPerCorrect} points</span>
                        </div>
                        ${completionBonus > 0 ? `
                        <div class="points-item bonus">
                            <span class="points-label">Completion Bonus:</span>
                            <span class="points-value">+${completionBonus} points</span>
                        </div>
                        ` : ''}
                        <div class="points-item total">
                            <span class="points-label">Total Points:</span>
                            <span class="points-value">+${pointsEarned} points</span>
                        </div>
                    </div>
                </div>
            `;
            // Insert after score display
            const scoreDisplay = resultsContent.querySelector('.score-display');
            if (scoreDisplay) {
                scoreDisplay.parentNode.insertBefore(pointsDisplay, scoreDisplay.nextSibling);
            }
        }

        // Mark lesson as completed if score is good enough (70% or higher)
        if (percentage >= 70) {
            const lessonKey = `${this.currentTopic.id}-${this.currentLesson}`;
            // Save to localStorage only for guest users
            if (!this.currentUser) {
                if (!this.completedLessons.includes(lessonKey)) {
                    this.completedLessons.push(lessonKey);
                    localStorage.setItem('completedLessons', JSON.stringify(this.completedLessons));
                    this.loadGuestProgress(); // Reload to ensure sync
                    this.updateProgress();
                } else {
                    this.updateProgress();
                }
            }
            // Save progress to server for authenticated users
            if (this.currentUser) {
                this.saveProgress(
                    this.currentTopic.id, 
                    `lesson-${this.currentLesson}`, 
                    true, 
                    this.correctAnswers, 
                    this.totalQuestions
                );
            }
        } else {
            // Save attempt even if not completed (only for authenticated users)
            if (this.currentUser) {
                this.saveProgress(
                    this.currentTopic.id, 
                    `lesson-${this.currentLesson}`, 
                    false, 
                    this.correctAnswers, 
                    this.totalQuestions
                );
            }
        }

        // Show/hide next lesson button based on available lessons
        const nextLessonBtn = document.getElementById('historyNextLessonBtn');
        if (this.currentLesson < this.currentTopic.lessonCount - 1 && nextLessonBtn) {
            nextLessonBtn.style.display = 'flex';
        } else if (nextLessonBtn) {
            nextLessonBtn.style.display = 'none';
        }
    }

    retryHistoryLesson() {
        // Clear the cached lesson to generate new questions
        const cacheKey = `${this.currentTopic.id}-${this.currentLesson}`;
        delete this.generatedQuestions[cacheKey];
        this.showHistoryLesson();
    }

    nextHistoryLesson() {
        if (this.currentLesson < this.currentTopic.lessonCount - 1) {
            this.currentLesson++;
            this.showHistoryLesson();
        }
    }

 
    // Leaderboard functionality

    async loadLeaderboard() {
        if (!this.currentUser) {
            this.clearLeaderboardDisplay();
            this.showMessage('Please log in to view the leaderboard.', 'warning');
            return;
        }

        try {
            const response = await fetch(`${this.API_BASE_URL}/leaderboard`, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                this.renderLeaderboard(data.leaderboard, data.user_rank);
            } else {
                this.showMessage('Failed to load leaderboard.', 'error');
            }
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            this.showMessage('Failed to load leaderboard.', 'error');
        }
    }

    clearLeaderboardDisplay() {
        const userRankElement = document.getElementById('userRank');
        const leaderboardListElement = document.getElementById('leaderboardList');
        if (userRankElement) {
            userRankElement.textContent = '-';
            console.log('DEBUG: Cleared user rank display');
        }
        if (leaderboardListElement) {
            leaderboardListElement.innerHTML = '';
            console.log('DEBUG: Cleared leaderboard list');
        }
    }

    renderLeaderboard(leaderboard, userRank) {
        document.getElementById('userRank').textContent = userRank || '-';

        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '';

        leaderboard.forEach((entry, index) => {
            const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-other';
            const rankNumber = index + 1;

            const entryHTML = `
                <div class="leaderboard-entry">
                    <div class="rank-number ${rankClass}">${rankNumber}</div>
                    <div class="username">${entry.username}</div>
                    <div class="stats-grid">
                        <div>
                            <div class="stat-label">Lessons</div>
                            <div class="stat-value">${entry.total_lessons_completed}</div>
                        </div>
                        <div>
                            <div class="stat-label">Score</div>
                            <div class="stat-value">${entry.total_score}</div>
                        </div>
                        <div>
                            <div class="stat-label">Streak</div>
                            <div class="streak-display">
                                <i class="fas fa-fire"></i>
                                <span>${entry.current_streak}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            leaderboardList.innerHTML += entryHTML;
        });
    }

    async loadUserStats() {
        if (!this.currentUser) return;

        try {
            const response = await fetch(`${this.API_BASE_URL}/user-stats`, {
                credentials: 'include'
            });

            if (response.ok) {
                const userStats = await response.json();
                this.updateUserStatsDisplay(userStats);
            }
        } catch (error) {
            console.error('Error loading user stats:', error);
        }
    }

    updateUserStatsDisplay(userStats) {
        document.getElementById('currentStreak').textContent = userStats.current_streak || 0;
        
        // Calculate total points from achievements
        this.calculateTotalPoints().then(totalPoints => {
            document.getElementById('totalPoints').textContent = totalPoints;
        });
    }

    async calculateTotalPoints() {
        if (!this.currentUser) return 0;

        try {
            const response = await fetch(`${this.API_BASE_URL}/achievements`, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                return data.earned_achievements.reduce((sum, a) => sum + a.points, 0);
            }
        } catch (error) {
            console.error('Error calculating total points:', error);
        }
        return 0;
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-details">
                    <h4>Achievement Unlocked!</h4>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                    <div class="achievement-points">+${achievement.points} points</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Add animation class
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Update the saveProgress method to handle achievement notifications
    async saveProgress(topicId, lessonId, completed, score, totalQuestions) {
        if (!this.currentUser) return;

        try {
            const response = await fetch(`${this.API_BASE_URL}/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    topic_id: topicId,
                    lesson_id: lessonId,
                    completed: completed,
                    score: score,
                    total_questions: totalQuestions
                })
            });

            if (response.ok) {
                const data = await response.json();
                
                // Show points earned notification
                if (data.points_earned > 0) {
                    this.showPointsNotification(data.points_earned, data.correct_answers, data.completion_bonus);
                }
                
                // Show achievement notifications if any new achievements were earned
                if (data.new_achievements && data.new_achievements.length > 0) {
                    // Delay achievement notifications slightly after points notification
                    setTimeout(() => {
                        data.new_achievements.forEach(achievement => {
                            this.showAchievementNotification(achievement);
                        });
                    }, 1500);
                }

                // Update user stats display
                await this.loadUserStats();
            } else {
                console.error('Failed to save progress');
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    showPointsNotification(pointsEarned, correctAnswers, completionBonus) {
        const notification = document.createElement('div');
        notification.className = 'points-notification';
        
        let bonusText = '';
        if (completionBonus > 0) {
            bonusText = `<div class="bonus-points">+${completionBonus} completion bonus!</div>`;
        }
        
        notification.innerHTML = `
            <div class="points-content">
                <div class="points-icon">🎯</div>
                <div class="points-details">
                    <h4>Points Earned!</h4>
                    <div class="points-breakdown">
                        <div class="correct-answers">${correctAnswers} correct answers: +${correctAnswers * 5} points</div>
                        ${bonusText}
                        <div class="total-points">Total: +${pointsEarned} points</div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Add animation class
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    loadGuestProgress() {
        this.completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    }

    showTopics() {
        // Only switch section, do not set pageTitle or pageSubtitle here
        this.switchSection('history');
    }

    updateAuthButton() {
        const authButtonContainer = document.getElementById('authButtonContainer');
        if (!authButtonContainer) return;
        
        if (this.currentUser) {
            // User is logged in - show user info and logout button
            authButtonContainer.innerHTML = `
                <div class="user-info">
                    <span>Welcome, ${this.currentUser.username}!</span>
                    <button class="btn-small" onclick="app.logoutUser()">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            `;
        } else {
            // User is not logged in - show login button
            authButtonContainer.innerHTML = `
                <button class="btn-small" id="loginButton" onclick="app.showAuthScreen()">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            `;
        }
    }

    clearAchievementsDisplay() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (achievementsGrid) {
            achievementsGrid.innerHTML = '';
        }
    }

    getDynamicDifficulty(topicId) {
        // Simple difficulty progression based on topic
        const difficulties = {
            'icail': 'beginner',
            'jurix': 'intermediate', 
            'journal': 'advanced',
            'history': 'beginner',
            'academics': 'intermediate',
            'cbr': 'advanced'
        };
        return difficulties[topicId] || 'beginner';
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DEBUG: DOMContentLoaded event fired');
    console.log('DEBUG: Document ready state:', document.readyState);
    console.log('DEBUG: Checking if historyTopicsGrid exists:', !!document.getElementById('historyTopicsGrid'));
    
    window.app = new AILawLearningApp();
    await app.initializeApp();
});

// Fallback initialization for window load event
window.addEventListener('load', async () => {
    console.log('DEBUG: Window load event fired');
    console.log('DEBUG: Document ready state:', document.readyState);
    console.log('DEBUG: Checking if historyTopicsGrid exists:', !!document.getElementById('historyTopicsGrid'));
    
    // Only initialize if not already done
    if (!window.app) {
        window.app = new AILawLearningApp();
        await app.initializeApp();
    }
});
