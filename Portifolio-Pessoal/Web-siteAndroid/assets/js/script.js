document.addEventListener("DOMContentLoaded", () => {
    // Configurações globais
    const config = {
        mobileBreakpoint: 768,
        animationDuration: 300
    };

    // Inicializa todos os módulos
    initResponsiveMenu();
    initTooltips();
    initReadMoreSection();
    initCurrentYear();
    initAnimations();

    /**
     * Menu Responsivo
     * - Cria o botão de menu para telas pequenas
     * - Gerencia a abertura/fechamento do menu
     */
    function initResponsiveMenu() {
        const header = document.querySelector(".site-header");
        const nav = document.querySelector(".main-nav");
        const menuToggle = document.querySelector(".menu-toggle");

        if (!header || !nav) return;

        // Verifica se já existe um botão de menu
        if (!menuToggle) {
            createMenuToggle();
        } else {
            setupMenuToggle();
        }

        // Atualiza o estado do menu quando a janela é redimensionada
        window.addEventListener("resize", handleResize);

        function createMenuToggle() {
            const newMenuToggle = document.createElement("button");
            newMenuToggle.classList.add("menu-toggle");
            newMenuToggle.setAttribute("aria-label", "Abrir menu");
            newMenuToggle.setAttribute("aria-expanded", "false");
            newMenuToggle.innerHTML = "☰ Menu";
            header.insertBefore(newMenuToggle, header.firstChild);
            
            setupMenuToggle(newMenuToggle);
        }

        function setupMenuToggle(toggleElement = menuToggle) {
            toggleElement.addEventListener("click", () => {
                const isExpanded = toggleElement.getAttribute("aria-expanded") === "true";
                toggleElement.setAttribute("aria-expanded", !isExpanded);
                nav.classList.toggle("active");
                
                // Adiciona overlay quando o menu está aberto
                if (!isExpanded) {
                    createOverlay();
                } else {
                    removeOverlay();
                }
            });
        }

        function createOverlay() {
            const overlay = document.createElement("div");
            overlay.classList.add("nav-overlay");
            document.body.appendChild(overlay);
            
            overlay.addEventListener("click", () => {
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                removeOverlay();
            });
        }

        function removeOverlay() {
            const overlay = document.querySelector(".nav-overlay");
            if (overlay) {
                overlay.remove();
            }
        }

        function handleResize() {
            if (window.innerWidth > config.mobileBreakpoint) {
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                removeOverlay();
            }
        }
    }

    /**
     * Sistema de Tooltips
     * - Melhora a acessibilidade dos tooltips
     * - Adiciona suporte a teclado
     */
    function initTooltips() {
        const tooltipItems = document.querySelectorAll("[data-tooltip]");
        
        tooltipItems.forEach(item => {
            // Configura eventos para mouse e teclado
            item.addEventListener("mouseenter", showTooltip);
            item.addEventListener("mouseleave", hideTooltip);
            item.addEventListener("focus", showTooltip);
            item.addEventListener("blur", hideTooltip);
            
            // Melhora a acessibilidade
            item.setAttribute("role", "tooltip");
            item.setAttribute("tabindex", "0");
        });

        function showTooltip(e) {
            const tooltip = e.target;
            const tooltipText = tooltip.getAttribute("data-tooltip");
            
            // Cria o elemento do tooltip se não existir
            let tooltipElement = tooltip.querySelector(".tooltip-content");
            
            if (!tooltipElement) {
                tooltipElement = document.createElement("span");
                tooltipElement.classList.add("tooltip-content");
                tooltipElement.textContent = tooltipText;
                tooltip.appendChild(tooltipElement);
                
                // Posiciona o tooltip
                positionTooltip(tooltip, tooltipElement);
            }
            
            tooltipElement.style.visibility = "visible";
            tooltipElement.style.opacity = "1";
        }

        function hideTooltip(e) {
            const tooltip = e.target;
            const tooltipElement = tooltip.querySelector(".tooltip-content");
            
            if (tooltipElement) {
                tooltipElement.style.visibility = "hidden";
                tooltipElement.style.opacity = "0";
            }
        }

        function positionTooltip(trigger, tooltip) {
            // Lógica para posicionamento inteligente do tooltip
            const rect = trigger.getBoundingClientRect();
            tooltip.style.position = "absolute";
            tooltip.style.bottom = "100%";
            tooltip.style.left = "50%";
            tooltip.style.transform = "translateX(-50%)";
            tooltip.style.marginBottom = "8px";
        }
    }

    /**
     * Seção "Leia Mais"
     * - Cria uma seção expansível para conteúdo adicional
     */
    function initReadMoreSection() {
        const mainContent = document.querySelector(".main-content");
        if (!mainContent) return;

        // Cria o container para o conteúdo adicional
        const extraContentContainer = document.createElement("div");
        extraContentContainer.classList.add("extra-content-container");
        
        // Cria o botão
        const readMoreBtn = document.createElement("button");
        readMoreBtn.classList.add("read-more-btn");
        readMoreBtn.textContent = "Leia Mais";
        readMoreBtn.setAttribute("aria-expanded", "false");
        
        // Cria o conteúdo adicional
        const extraContent = document.createElement("div");
        extraContent.classList.add("extra-content", "hidden");
        extraContent.innerHTML = `
            <p>O Android continua evoluindo a cada ano, trazendo novas funcionalidades e melhorias de segurança para seus usuários.</p>
            <p>Desde sua criação, o sistema operacional já passou por mais de 20 atualizações significativas, cada uma trazendo melhorias de performance, novas APIs para desenvolvedores e recursos inovadores para usuários finais.</p>
        `;
        
        // Monta a estrutura
        extraContentContainer.appendChild(readMoreBtn);
        extraContentContainer.appendChild(extraContent);
        mainContent.appendChild(extraContentContainer);
        
        // Adiciona interação
        readMoreBtn.addEventListener("click", toggleReadMore);

        function toggleReadMore() {
            const isExpanded = readMoreBtn.getAttribute("aria-expanded") === "true";
            readMoreBtn.setAttribute("aria-expanded", !isExpanded);
            extraContent.classList.toggle("hidden");
            
            // Anima a abertura/fechamento
            if (!isExpanded) {
                extraContent.style.height = "0";
                extraContent.classList.remove("hidden");
                const contentHeight = extraContent.scrollHeight;
                extraContent.style.height = `${contentHeight}px`;
                
                setTimeout(() => {
                    extraContent.style.height = "auto";
                }, config.animationDuration);
            } else {
                extraContent.style.height = `${extraContent.scrollHeight}px`;
                setTimeout(() => {
                    extraContent.style.height = "0";
                }, 10);
            }
            
            readMoreBtn.textContent = isExpanded ? "Leia Mais" : "Leia Menos";
        }
    }

    /**
     * Atualiza o ano no rodapé
     */
    function initCurrentYear() {
        const yearElement = document.getElementById("current-year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Inicializa animações quando elementos entram na viewport
     */
    function initAnimations() {
        // Verifica se o usuário prefere redução de movimento
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (prefersReducedMotion) return;
        
        const animatedElements = document.querySelectorAll("[data-animate]");
        
        // Cria um IntersectionObserver para animar elementos quando ficam visíveis
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute("data-animate", "show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Função auxiliar para debounce (evitar múltiplas execuções rápidas)
     */
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
});

//? aqui começa o botão leia mais

document.addEventListener("DOMContentLoaded", () => {
    // Configurações globais
    const config = {
        mobileBreakpoint: 768,
        animationDuration: 300
    };

    // Inicializa todos os módulos
    initResponsiveMenu();
    initTooltips();
    initReadMoreSection();
    initCurrentYear();
    initAnimations();

    // ...existing code...

    /**
     * Seção "Leia Mais"
     * - Cria uma seção expansível para conteúdo adicional
     */
    function initReadMoreSection() {
        const mainContent = document.querySelector(".main-content");
        if (!mainContent) return;

        // Cria o container para o conteúdo adicional
        const extraContentContainer = document.createElement("div");
        extraContentContainer.classList.add("extra-content-container");
        
        // Cria o botão
        const readMoreBtn = document.createElement("button");
        readMoreBtn.classList.add("read-more-btn", "btn", "btn-primary"); // Adiciona classes CSS
        readMoreBtn.textContent = "Leia Mais";
        readMoreBtn.setAttribute("aria-expanded", "false");
        
        // Cria o conteúdo adicional
        const extraContent = document.createElement("div");
        extraContent.classList.add("extra-content", "hidden");
        extraContent.innerHTML = `
            <p>O Android continua evoluindo a cada ano, trazendo novas funcionalidades e melhorias de segurança para seus usuários.</p>
            <p>Desde sua criação, o sistema operacional já passou por mais de 20 atualizações significativas, cada uma trazendo melhorias de performance, novas APIs para desenvolvedores e recursos inovadores para usuários finais.</p>
        `;
        
        // Monta a estrutura
        extraContentContainer.appendChild(readMoreBtn);
        extraContentContainer.appendChild(extraContent);
        mainContent.appendChild(extraContentContainer);
        
        // Adiciona interação
        readMoreBtn.addEventListener("click", toggleReadMore);

        function toggleReadMore() {
            const isExpanded = readMoreBtn.getAttribute("aria-expanded") === "true";
            readMoreBtn.setAttribute("aria-expanded", !isExpanded);
            extraContent.classList.toggle("hidden");
            
            // Anima a abertura/fechamento
            if (!isExpanded) {
                extraContent.style.height = "0";
                extraContent.classList.remove("hidden");
                const contentHeight = extraContent.scrollHeight;
                extraContent.style.height = `${contentHeight}px`;
                
                setTimeout(() => {
                    extraContent.style.height = "auto";
                }, config.animationDuration);
            } else {
                extraContent.style.height = `${extraContent.scrollHeight}px`;
                setTimeout(() => {
                    extraContent.style.height = "0";
                }, 10);
            }
            
            readMoreBtn.textContent = isExpanded ? "Leia Mais" : "Leia Menos";
        }
    }

    // ...existing code...
});