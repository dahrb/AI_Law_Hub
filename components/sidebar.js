// components/sidebar.js

export class SidebarComponent {
    constructor(onSectionChange) {
        this.onSectionChange = onSectionChange;
    }

    init() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                if (section) {
                    this.setActive(section);
                    if (this.onSectionChange) this.onSectionChange(section);
                }
            });
        });
    }

    setActive(section) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const itemSection = item.getAttribute('data-section');
            if (itemSection === section) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
} 