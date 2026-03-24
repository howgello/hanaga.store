document.addEventListener('DOMContentLoaded', () => {

    // 1. Вкладки навигации
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(item => item.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            link.classList.add('active');
            const target = link.getAttribute('data-section');
            document.getElementById(target).classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. Смена фото при переключении цвета футболки Tang
    const colorSelect = document.getElementById('color-select');
    const tsImg = document.getElementById('ts-color-img');
    const addCustomBtn = document.getElementById('add-custom-tshirt');

    if (colorSelect && tsImg && addCustomBtn) {
        colorSelect.addEventListener('change', (e) => {
            const color = e.target.value;
            addCustomBtn.setAttribute('data-name', `Tang suit shirt (${color})`);

            if (color === 'Черная') {
                tsImg.src = 'tang1.jpg';
            } else {
                tsImg.src = 'tang2.jpg';
            }
        });
    }

    // Проверка статусов "data-stock"
    document.querySelectorAll('.card').forEach(card => {
        const stock = card.getAttribute('data-stock');
        const btn = card.querySelector('.add-btn');
        if (stock === 'soon' && btn) {
            btn.disabled = true;
            btn.innerText = 'Ожидается';
        }
    });

    // 3. Фильтрация аксессуаров
    const filterBtns = document.querySelectorAll('.filter-btn');
    const accessoryCards = document.querySelectorAll('.accessory-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            accessoryCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Корзина
    let cart = [];
    const openCartBtn = document.getElementById('cart-open');
    const closeCartBtn = document.getElementById('cart-close');
    const cartPanel = document.getElementById('cart-panel');
    const addBtns = document.querySelectorAll('.add-btn');
    const cartItemsWrapper = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceWrapper = document.getElementById('total-price');
    const clearCartBtn = document.getElementById('clear-cart');

    openCartBtn.addEventListener('click', () => cartPanel.classList.add('open'));
    closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('open'));

    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));

            cart.push({ name, price });
            updateCart();
            alert(`"${name}" сохранено в список.`);
        });
    });

    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    function updateCart() {
        cartItemsWrapper.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            cartItemsWrapper.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>${item.price} KGS <span class="remove-item" data-index="${index}">✕</span></span>
                </div>
            `;
        });

        cartCount.innerText = cart.length;
        totalPriceWrapper.innerText = `Итого: ${total} KGS`;

        document.querySelectorAll('.remove-item').forEach(cross => {
            cross.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                cart.splice(idx, 1);
                updateCart();
            });
        });
    }
});