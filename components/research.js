// components/research.js

export class ResearchComponent {
    constructor(apiBaseUrl) {
        this.API_BASE_URL = apiBaseUrl;
        this.currentVenue = '';
    }

    async init() {
        const yearFilter = document.getElementById('yearFilter');
        const sortDropdown = document.getElementById('sortDropdown');
        const filterTabs = document.querySelectorAll('.filter-tab');
        await this.populateYearFilter('');
        // Bind filter events
        const updateKeyPapersIfVisible = () => {
            const section = document.getElementById('keyPapersSection');
            if (section && !section.classList.contains('hidden')) {
                this.loadKeyPapers();
            }
        };
        if (yearFilter) yearFilter.addEventListener('change', () => {
            this.loadRecentPapers();
            updateKeyPapersIfVisible();
        });
        if (sortDropdown) sortDropdown.addEventListener('change', () => {
            this.loadRecentPapers();
            updateKeyPapersIfVisible();
        });
        filterTabs.forEach(tab => {
            tab.addEventListener('click', async () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentVenue = tab.dataset.filter && tab.dataset.filter !== 'all' ? tab.dataset.filter : '';
                await this.populateYearFilter(this.currentVenue);
                this.loadRecentPapers();
                updateKeyPapersIfVisible();
            });
        });
        // Robust event delegation for toggle button
        const filtersBar = document.querySelector('.research-filters');
        if (filtersBar) {
            filtersBar.addEventListener('click', (e) => {
                const btn = e.target.closest('#toggleKeyPapers');
                if (btn) {
                    this.toggleKeyPapersSection();
                }
            });
        }
        // Move papers count to right
        const papersCount = document.getElementById('papersCount');
        if (filtersBar && papersCount) {
            filtersBar.appendChild(papersCount);
            papersCount.style.marginLeft = 'auto';
        }
        // Always start hidden
        this.hideKeyPapersSection();
    }

    async populateYearFilter(venue) {
        const yearFilter = document.getElementById('yearFilter');
        if (!yearFilter) return;
        try {
            let url = `${this.API_BASE_URL}/research-years`;
            if (venue) url += `?venue=${encodeURIComponent(venue)}`;
            const resp = await fetch(url);
            const data = await resp.json();
            yearFilter.innerHTML = '<option value="">All Years</option>' +
                (data.years || []).map(y => `<option value="${y}">${y}</option>`).join('');
        } catch (e) {
            yearFilter.innerHTML = '<option value="">All Years</option>';
        }
    }

    show() {
        this.loadRecentPapers();
    }

    async loadRecentPapers() {
        const papersList = document.getElementById('papersList');
        if (papersList) papersList.innerHTML = '<div>Loading...</div>';
        try {
            const year = document.getElementById('yearFilter')?.value || '';
            let venue = this.currentVenue || '';
            const sort = document.getElementById('sortDropdown')?.value || 'date';
            const url = `${this.API_BASE_URL}/recent-papers?year=${encodeURIComponent(year)}&venue=${encodeURIComponent(venue)}&sort=${encodeURIComponent(sort)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('API error');
            const data = await response.json();
            if (!data.papers || !Array.isArray(data.papers)) throw new Error('No papers array in response');
            this.renderPapers(data.papers);
            const papersCount = document.getElementById('papersCount');
            if (papersCount) papersCount.textContent = `${data.papers.length} papers`;
        } catch (err) {
            if (papersList) papersList.innerHTML = `<div style='color:red'>Failed to load papers: ${err.message}</div>`;
            const papersCount = document.getElementById('papersCount');
            if (papersCount) papersCount.textContent = '0 papers';
        }
    }

    renderPapers(papers) {
        const papersList = document.getElementById('papersList');
        if (!papersList) return;
        if (!papers.length) {
            papersList.innerHTML = '<div>No papers found in the database.</div>';
            return;
        }
        papersList.innerHTML = papers.map(paper => {
            let citations = (typeof paper.citations !== 'undefined' && !isNaN(Number(paper.citations))) ? Number(paper.citations) : 0;
            return `
                <div class='paper-card pretty'>
                    <div class='paper-header'>
                        <h3 class='paper-title'>${paper.title || 'Untitled Paper'}</h3>
                        <div class='paper-meta'>
                            <span class='paper-year'>${paper.publication_date || 'Unknown Year'}</span>
                            <span class='paper-venue'>${paper.venue || 'Unknown Venue'}</span>
                            <span class='paper-citations'><i class='fas fa-quote-right'></i> ${citations}</span>
                        </div>
                    </div>
                    <div class='paper-authors'><b>Authors:</b> ${paper.authors || 'Unknown Authors'}</div>
                    <div class='paper-abstract'>${paper.abstract ? paper.abstract.substring(0, 400) : 'No abstract available.'}</div>
                    <div class='paper-footer'>
                        ${paper.url ? `<a href='${paper.url}' target='_blank' class='btn secondary'>View Paper</a>` : ''}
                    </div>
                </div>`;
        }).join('');
    }

    // --- KEY PAPERS SECTION LOGIC FROM SCRATCH ---
    toggleKeyPapersSection() {
        const section = document.getElementById('keyPapersSection');
        const btn = document.getElementById('toggleKeyPapers');
        if (!section || !btn) return;
        const star = btn.querySelector('.star-icon');
        const isHidden = section.classList.contains('hidden');
        if (isHidden) {
            section.classList.remove('hidden');
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            if (star) star.textContent = '★';
            this.loadKeyPapers();
        } else {
            section.classList.add('hidden');
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            if (star) star.textContent = '☆';
            section.innerHTML = '';
        }
    }

    showKeyPapersSection() {
        const section = document.getElementById('keyPapersSection');
        const btn = document.getElementById('toggleKeyPapers');
        if (!section || !btn) return;
        section.classList.remove('hidden');
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const star = btn.querySelector('.star-icon');
        if (star) star.textContent = '★';
        this.loadKeyPapers();
    }

    hideKeyPapersSection() {
        const section = document.getElementById('keyPapersSection');
        const btn = document.getElementById('toggleKeyPapers');
        if (!section || !btn) return;
        section.classList.add('hidden');
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
        const star = btn.querySelector('.star-icon');
        if (star) star.textContent = '☆';
    }

    async loadKeyPapers() {
        const section = document.getElementById('keyPapersSection');
        if (!section) return;
        section.innerHTML = '<div style="padding:1em">Loading key papers...</div>';
        const year = document.getElementById('yearFilter')?.value || '';
        let venue = this.currentVenue || '';
        const url = `${this.API_BASE_URL}/recent-papers?year=${encodeURIComponent(year)}&venue=${encodeURIComponent(venue)}&sort=citations`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!data.papers || !data.papers.length) {
                section.innerHTML = '<div style="padding:1em">No key papers found.</div>';
                return;
            }
            
            // Take top 12 papers by citations for the grid
            const topPapers = data.papers
                .sort((a, b) => (b.citations || 0) - (a.citations || 0))
                .slice(0, 12);
            
            section.innerHTML = `
                <h3>Key Papers by Citations</h3>
                <div class="key-papers-grid">
                    ${topPapers.map(paper => {
                        const citations = typeof paper.citations === 'number' ? paper.citations : (paper.citations || 0);
                        const year = (paper.publication_date || '').slice(0, 4);
                        const venue = paper.venue || 'Unknown Venue';
                        const authors = paper.authors || 'Unknown Authors';
                        
                        return `
                            <div class="key-paper-card" onclick="window.open('${paper.url || '#'}', '_blank')">
                                <h4>${paper.title || 'Untitled Paper'}</h4>
                                <p class="authors">${authors}</p>
                                <p class="venue">${venue}</p>
                                <p class="year">${year}</p>
                                <div class="citations">
                                    <i class="fas fa-quote-right"></i> ${citations} citations
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } catch (e) {
            section.innerHTML = '<div style="padding:1em;color:red">Failed to load key papers.</div>';
        }
    }
} 