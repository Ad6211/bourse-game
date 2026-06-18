// Game State
const gameState = {
    balance: 10.00, // 10 µ de départ
    transactions: 0,
    totalProfit: 0,
    portfolio: {},
    favorites: [],
    upgrades: {
        marketAnalysis: { level: 0, baseCost: 5, effect: 0 },
        insiderInfo: { level: 0, baseCost: 15, effect: 0 },
        autoTrader: { level: 0, baseCost: 50, effect: 0 },
        volatilityPredictor: { level: 0, baseCost: 100, effect: 0 },
        stockScanner: { level: 0, baseCost: 200, effect: 0 },
        priceAlert: { level: 0, baseCost: 75, effect: 0 }
    },
    achievements: {
        firstTrade: false,
        profit100: false,
        profit500: false,
        profit1000: false,
        profit10000: false,
        trades10: false,
        trades50: false,
        trades100: false,
        upgrade5: false,
        upgrade10: false,
        portfolio10: false,
        millionaire: false,
        collector: false
    },
    totalEarned: 0,
    eventLog: [],
    currentPage: 0,
    sortBy: 'price',
    sortOrder: 'desc',
    stocksPerPage: 5,
    priceAlerts: []
};

// Generate 200 stocks with prices from 1µ to 1Mdµ
function generateStocks() {
    const sectors = [
        { name: 'tech', companies: ['TechVision', 'DigitalWorld', 'CodeMaster', 'ByteFlow', 'CloudNet', 'DataCore', 'AI Labs', 'CyberSec', 'RoboTech', 'SmartSys'] },
        { name: 'food', companies: ['GourmetExpress', 'AgriFood', 'FreshMarket', 'BioEats', 'GreenTable', 'ChefPro', 'FoodTech', 'OrganicPlus', 'MealBox', 'SnackWorld'] },
        { name: 'energy', companies: ['GreenPower', 'EcoEnergy', 'SolarMax', 'WindForce', 'HydroGen', 'PowerGrid', 'CleanEnergy', 'FuelCell', 'EnergySmart', 'GridTech'] },
        { name: 'auto', companies: ['SpeedAuto', 'AutoFuture', 'ElectricDrive', 'CarTech', 'MobilityX', 'AutoParts', 'DriveTech', 'VehiclePro', 'AutoSmart', 'MotorWorks'] },
        { name: 'pharma', companies: ['MediCare', 'HealthPlus', 'BioGenetics', 'PharmaLab', 'MedTech', 'DrugDiscovery', 'HealthTech', 'BioPharm', 'MediSupply', 'CureTech'] },
        { name: 'finance', companies: ['CryptoBank', 'SecureBank', 'FinTech', 'PayFlow', 'InvestPro', 'BankSecure', 'MoneySmart', 'FinanceHub', 'WealthTech', 'CapitalFlow'] },
        { name: 'retail', companies: ['ShopMax', 'LuxuryBrands', 'RetailPro', 'ShopTech', 'MarketPlus', 'StoreChain', 'BuySmart', 'RetailHub', 'ShopFlow', 'CommerceX'] },
        { name: 'travel', companies: ['SkyHigh', 'TransLogistics', 'TravelPro', 'AirTech', 'HotelChain', 'TripPlanner', 'TravelHub', 'JourneyX', 'VacationPro', 'TourTech'] },
        { name: 'realestate', companies: ['PropertyKing', 'BuildCorp', 'RealEstatePro', 'HomeTech', 'BuildTech', 'PropertyPro', 'RealtyPlus', 'EstateSmart', 'ConstructX', 'PropertyHub'] },
        { name: 'media', companies: ['MediaStream', 'ContentPro', 'VideoTech', 'StreamX', 'MediaHub', 'ContentFlow', 'DigitalMedia', 'MediaPro', 'StreamTech', 'ContentHub'] },
        { name: 'gaming', companies: ['PlayStudio', 'GameTech', 'GamingPro', 'GameHub', 'PlayTech', 'GameFlow', 'GamingX', 'GameMaster', 'PlayPro', 'GameWorld'] },
        { name: 'telecom', companies: ['TeleCom', 'NetSpeed', 'ConnectPro', 'TeleTech', 'NetHub', 'ConnectX', 'TeleFlow', 'NetPro', 'ConnectTech', 'TeleWorld'] },
        { name: 'education', companies: ['EduTech', 'LearnPro', 'EduHub', 'LearnTech', 'EduFlow', 'LearnX', 'EduSmart', 'LearnHub', 'EduPro', 'LearnWorld'] },
        { name: 'healthcare', companies: ['HealthCare', 'MediPro', 'HealthHub', 'CareTech', 'MediFlow', 'HealthX', 'CarePro', 'MediHub', 'HealthTech', 'CareWorld'] },
        { name: 'logistics', companies: ['LogiTech', 'ShipPro', 'LogiHub', 'ShipTech', 'LogiFlow', 'ShipX', 'LogiSmart', 'ShipHub', 'LogiPro', 'ShipWorld'] }
    ];

    const stocks = [];
    let symbolCounter = 1;

    // Price ranges: 1-10, 10-100, 100-1k, 1k-10k, 10k-100k, 100k-1M, 1M-10M, 10M-100M, 100M-1B
    const priceRanges = [
        { min: 1, max: 10, count: 25 },
        { min: 10, max: 100, count: 30 },
        { min: 100, max: 1000, count: 30 },
        { min: 1000, max: 10000, count: 30 },
        { min: 10000, max: 100000, count: 25 },
        { min: 100000, max: 1000000, count: 20 },
        { min: 1000000, max: 10000000, count: 15 },
        { min: 10000000, max: 100000000, count: 15 },
        { min: 100000000, max: 1000000000, count: 10 }
    ];

    priceRanges.forEach(range => {
        for (let i = 0; i < range.count; i++) {
            const sector = sectors[Math.floor(Math.random() * sectors.length)];
            const company = sector.companies[Math.floor(Math.random() * sector.companies.length)];
            const basePrice = range.min + Math.random() * (range.max - range.min);
            const volatility = 0.03 + Math.random() * 0.07; // 3-10% volatility
            
            stocks.push({
                symbol: `${company.substring(0, 4).toUpperCase()}${symbolCounter}`,
                name: `${company} ${['Inc.', 'Corp.', 'Ltd.', 'Group', 'Holdings', 'International'][Math.floor(Math.random() * 6)]}`,
                basePrice: basePrice,
                volatility: volatility,
                history: [],
                sector: sector.name
            });
            
            symbolCounter++;
        }
    });

    return stocks;
}

const stocks = generateStocks();

// Initialize stock history
stocks.forEach(stock => {
    stock.currentPrice = stock.basePrice;
    stock.previousPrice = stock.basePrice;
    for (let i = 0; i < 20; i++) {
        stock.history.push(stock.basePrice);
    }
});

// Random events system
const events = [
    { 
        name: 'Révolution Tech!', 
        effect: 'tech', 
        multiplier: 1.5, 
        duration: 10,
        description: 'Les actions tech explosent!'
    },
    { 
        name: 'Crise Alimentaire', 
        effect: 'food', 
        multiplier: 0.6, 
        duration: 8,
        description: 'Crise dans le secteur alimentaire'
    },
    { 
        name: 'Pétrole au plus bas', 
        effect: 'energy', 
        multiplier: 0.7, 
        duration: 12,
        description: 'Les énergies vertes souffrent'
    },
    { 
        name: 'Salon Auto Mondial', 
        effect: 'auto', 
        multiplier: 1.4, 
        duration: 10,
        description: 'Les constructeurs brillent'
    },
    { 
        name: 'Découverte Médicale', 
        effect: 'pharma', 
        multiplier: 1.6, 
        duration: 15,
        description: 'Breakthrough pharmaceutique!'
    },
    { 
        name: 'Régulation Crypto', 
        effect: 'finance', 
        multiplier: 0.5, 
        duration: 20,
        description: 'Guerre réglementaire'
    },
    { 
        name: 'Sortie de jeu AAA', 
        effect: 'tech', 
        multiplier: 1.3, 
        duration: 8,
        description: 'Succès critique dans le gaming'
    },
    { 
        name: 'Black Friday', 
        effect: 'retail', 
        multiplier: 1.5, 
        duration: 5,
        description: 'Ventes records!'
    },
    { 
        name: 'Pandémie', 
        effect: 'travel', 
        multiplier: 0.4, 
        duration: 25,
        description: 'Les voyages s\'arrêtent'
    },
    { 
        name: 'Bulle Immobilière', 
        effect: 'realestate', 
        multiplier: 1.8, 
        duration: 12,
        description: 'Marché immobilier en folie'
    }
];

let activeEvents = [];

function triggerRandomEvent() {
    if (Math.random() > 0.3 || activeEvents.length >= 2) return; // 30% chance, max 2 events
    
    const event = events[Math.floor(Math.random() * events.length)];
    activeEvents.push({
        ...event,
        startTime: Date.now(),
        remainingTime: event.duration
    });
    
    gameState.eventLog.unshift({
        name: event.name,
        description: event.description,
        time: new Date().toLocaleTimeString()
    });
    
    if (gameState.eventLog.length > 10) {
        gameState.eventLog.pop();
    }
    
    showEventNotification(event);
}

function showEventNotification(event) {
    const notification = document.createElement('div');
    notification.className = 'event-notification';
    notification.innerHTML = `
        <div class="event-icon">⚡</div>
        <div class="event-content">
            <div class="event-name">${event.name}</div>
            <div class="event-description">${event.description}</div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function updateActiveEvents() {
    const now = Date.now();
    activeEvents = activeEvents.filter(event => {
        const elapsed = (now - event.startTime) / 1000;
        event.remainingTime = event.duration - elapsed;
        return event.remainingTime > 0;
    });
}

function getEventMultiplier(sector) {
    let multiplier = 1;
    activeEvents.forEach(event => {
        if (event.effect === sector) {
            multiplier *= event.multiplier;
        }
    });
    return multiplier;
}

// Update stock prices
function updateStockPrices() {
    updateActiveEvents();
    
    stocks.forEach(stock => {
        stock.previousPrice = stock.currentPrice;
        
        // Random price movement with trend and events
        // Variation en POURCENTAGE avec minimum visible
        const baseChange = (Math.random() - 0.5) * stock.volatility * 3; // ±volatilité * 3 pour plus de variation
        const eventMultiplier = getEventMultiplier(stock.sector);
        
        // Boost des événements en pourcentage
        const eventBoost = (eventMultiplier - 1) * 0.5; // Jusqu'à ±50% selon événement
        
        // Changement total en pourcentage
        const percentChange = baseChange + eventBoost;
        
        // Appliquer le changement en pourcentage
        stock.currentPrice = Math.max(0.5, stock.currentPrice * (1 + percentChange));
        
        // Update history
        stock.history.push(stock.currentPrice);
        if (stock.history.length > 20) {
            stock.history.shift();
        }
    });
    
    // Trigger random events occasionnellement
    if (Math.random() < 0.10) { // 10% de chance
        triggerRandomEvent();
    }
}

// Format number with suffix (µ, kµ, Mµ, Mdµ)
function formatNumber(num) {
    if (num < 1000) {
        return num.toFixed(2) + ' µ';
    } else if (num < 1000000) {
        return (num / 1000).toFixed(2) + ' kµ';
    } else if (num < 1000000000) {
        return (num / 1000000).toFixed(2) + ' Mµ';
    } else {
        return (num / 1000000000).toFixed(2) + ' Mdµ';
    }
}

// Sort stocks
function sortStocks(stocksArray) {
    const sorted = [...stocksArray];
    
    sorted.sort((a, b) => {
        let valueA, valueB;
        
        switch(gameState.sortBy) {
            case 'price':
                valueA = a.currentPrice;
                valueB = b.currentPrice;
                break;
            case 'change':
                valueA = ((a.currentPrice - a.previousPrice) / a.previousPrice) * 100;
                valueB = ((b.currentPrice - b.previousPrice) / b.previousPrice) * 100;
                break;
            case 'name':
                valueA = a.name;
                valueB = b.name;
                return gameState.sortOrder === 'asc' ? 
                    valueA.localeCompare(valueB) : 
                    valueB.localeCompare(valueA);
            case 'symbol':
                valueA = a.symbol;
                valueB = b.symbol;
                return gameState.sortOrder === 'asc' ? 
                    valueA.localeCompare(valueB) : 
                    valueB.localeCompare(valueA);
            default:
                valueA = a.currentPrice;
                valueB = b.currentPrice;
        }
        
        if (gameState.sortOrder === 'asc') {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    });
    
    return sorted;
}

// Change sort
function changeSort(sortBy) {
    if (gameState.sortBy === sortBy) {
        gameState.sortOrder = gameState.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        gameState.sortBy = sortBy;
        gameState.sortOrder = 'desc';
    }
    gameState.currentPage = 0;
    renderStocks();
    renderPagination();
}

// Change page
function changePage(delta) {
    const totalPages = Math.ceil(stocks.length / gameState.stocksPerPage);
    gameState.currentPage += delta;
    
    if (gameState.currentPage < 0) {
        gameState.currentPage = 0;
    } else if (gameState.currentPage >= totalPages) {
        gameState.currentPage = totalPages - 1;
    }
    
    renderStocks();
    renderPagination();
}

// Render pagination
function renderPagination() {
    const container = document.getElementById('pagination-container');
    if (!container) return;
    
    const totalPages = Math.ceil(stocks.length / gameState.stocksPerPage);
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination">';
    paginationHTML += `<button class="btn-page" onclick="changePage(-1)" ${gameState.currentPage === 0 ? 'disabled' : ''}>◀ Précédent</button>`;
    paginationHTML += `<span class="page-info">Page ${gameState.currentPage + 1} / ${totalPages}</span>`;
    paginationHTML += `<button class="btn-page" onclick="changePage(1)" ${gameState.currentPage >= totalPages - 1 ? 'disabled' : ''}>Suivant ▶</button>`;
    paginationHTML += '</div>';
    
    container.innerHTML = paginationHTML;
}

// Render stocks
function renderStocks() {
    const container = document.getElementById('stocks-container');
    container.innerHTML = '';

    // Sort stocks
    const sortedStocks = sortStocks(stocks);
    
    // Paginate
    const startIndex = gameState.currentPage * gameState.stocksPerPage;
    const endIndex = startIndex + gameState.stocksPerPage;
    const stocksToShow = sortedStocks.slice(startIndex, endIndex);

    stocksToShow.forEach(stock => {
        const change = ((stock.currentPrice - stock.previousPrice) / stock.previousPrice) * 100;
        const changeClass = change >= 0 ? 'positive' : 'negative';
        const changeSymbol = change >= 0 ? '▲' : '▼';
        
        // Check if stock is affected by active event
        const hasActiveEvent = activeEvents.some(event => event.effect === stock.sector);
        const cardClass = hasActiveEvent ? 'stock-card event-active' : 'stock-card';
        
        // Check if stock is favorite
        const isFavorite = gameState.favorites.includes(stock.symbol);

        const stockCard = document.createElement('div');
        stockCard.className = cardClass;
        stockCard.innerHTML = `
            <div class="stock-header">
                <div>
                    <span class="stock-name">${stock.name}</span>
                </div>
                <span class="stock-symbol">${stock.symbol}</span>
            </div>
            <div class="stock-price">
                ${formatNumber(stock.currentPrice)}
                <span class="price-change ${changeClass}">${changeSymbol} ${Math.abs(change).toFixed(2)}%</span>
            </div>
            <div class="stock-chart" id="chart-${stock.symbol}"></div>
            <div class="stock-actions">
                <button class="btn-buy" onclick="buyStock('${stock.symbol}')">Acheter</button>
                <button class="btn-sell" onclick="sellStock('${stock.symbol}')">Vendre</button>
            </div>
            <div class="stock-actions-secondary">
                <button class="btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${stock.symbol}')" title="Ajouter aux favoris">
                    ${isFavorite ? '⭐' : '☆'}
                </button>
                <button class="btn-alert" onclick="setPriceAlert('${stock.symbol}')" title="Créer une alerte de prix">
                    🔔
                </button>
            </div>
            <div class="quantity-control">
                <label>Quantité:</label>
                <input type="number" id="qty-${stock.symbol}" value="1" min="1" max="100">
            </div>
        `;
        container.appendChild(stockCard);

        // Render chart
        renderChart(stock);
    });
}

// Render mini chart
function renderChart(stock) {
    const chartContainer = document.getElementById(`chart-${stock.symbol}`);
    if (!chartContainer) return;

    chartContainer.innerHTML = '';
    const maxPrice = Math.max(...stock.history);
    const minPrice = Math.min(...stock.history);
    const range = maxPrice - minPrice || 1;

    stock.history.forEach(price => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const height = ((price - minPrice) / range) * 100;
        bar.style.height = `${Math.max(height, 10)}%`;
        
        // Color based on trend
        if (price >= stock.history[stock.history.length - 1]) {
            bar.style.background = '#10b981';
        } else {
            bar.style.background = '#ef4444';
        }
        
        chartContainer.appendChild(bar);
    });
}

// Check achievements
function checkAchievements() {
    // First trade
    if (gameState.transactions >= 1 && !gameState.achievements.firstTrade) {
        gameState.achievements.firstTrade = true;
        showAchievement('Premier Trade!', 'Vous avez effectué votre première transaction');
    }

    // Profit milestones
    if (gameState.totalProfit >= 100 && !gameState.achievements.profit100) {
        gameState.achievements.profit100 = true;
        showAchievement('Profit 100µ!', 'Vous avez réalisé 100µ de profit');
    }
    if (gameState.totalProfit >= 500 && !gameState.achievements.profit500) {
        gameState.achievements.profit500 = true;
        showAchievement('Profit 500µ!', 'Vous avez réalisé 500µ de profit');
    }
    if (gameState.totalProfit >= 1000 && !gameState.achievements.profit1000) {
        gameState.achievements.profit1000 = true;
        showAchievement('Profit 1000µ!', 'Vous avez réalisé 1000µ de profit');
    }

    // Trade count milestones
    if (gameState.transactions >= 10 && !gameState.achievements.trades10) {
        gameState.achievements.trades10 = true;
        showAchievement('10 Transactions!', 'Vous avez effectué 10 transactions');
    }
    if (gameState.transactions >= 50 && !gameState.achievements.trades50) {
        gameState.achievements.trades50 = true;
        showAchievement('50 Transactions!', 'Vous avez effectué 50 transactions');
    }
    if (gameState.transactions >= 100 && !gameState.achievements.trades100) {
        gameState.achievements.trades100 = true;
        showAchievement('100 Transactions!', 'Vous avez effectué 100 transactions');
    }

    // Upgrade milestones
    const totalUpgrades = Object.values(gameState.upgrades).reduce((sum, u) => sum + u.level, 0);
    if (totalUpgrades >= 5 && !gameState.achievements.upgrade5) {
        gameState.achievements.upgrade5 = true;
        showAchievement('5 Améliorations!', 'Vous avez acheté 5 améliorations');
    }
    if (totalUpgrades >= 10 && !gameState.achievements.upgrade10) {
        gameState.achievements.upgrade10 = true;
        showAchievement('10 Améliorations!', 'Vous avez acheté 10 améliorations');
    }

    // Portfolio milestones
    const portfolioSize = Object.keys(gameState.portfolio).length;
    if (portfolioSize >= 10 && !gameState.achievements.portfolio10) {
        gameState.achievements.portfolio10 = true;
        showAchievement('Portefeuille Diversifié!', 'Vous possédez 10 actions différentes');
    }
}

function showAchievement(title, description) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-notification';
    achievement.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-content">
            <div class="achievement-title">${title}</div>
            <div class="achievement-description">${description}</div>
        </div>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        achievement.classList.remove('show');
        setTimeout(() => achievement.remove(), 300);
    }, 4000);
}

// Buy stock
function buyStock(symbol) {
    const stock = stocks.find(s => s.symbol === symbol);
    const quantityInput = document.getElementById(`qty-${symbol}`);
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Validate quantity
    if (quantity <= 0) {
        alert('La quantité doit être supérieure à 0!');
        return;
    }
    
    const totalCost = stock.currentPrice * quantity;

    if (totalCost > gameState.balance) {
        alert(`Fonds insuffisants! Il vous manque ${(totalCost - gameState.balance).toFixed(2)} µ`);
        return;
    }

    gameState.balance -= totalCost;
    gameState.transactions++;
    gameState.totalEarned += totalCost;

    if (!gameState.portfolio[symbol]) {
        gameState.portfolio[symbol] = {
            quantity: 0,
            avgPrice: 0,
            totalCost: 0
        };
    }

    const position = gameState.portfolio[symbol];
    const newTotalCost = position.totalCost + totalCost;
    const newQuantity = position.quantity + quantity;
    
    position.quantity = newQuantity;
    position.avgPrice = newTotalCost / newQuantity;
    position.totalCost = newTotalCost;

    // Reset quantity input
    quantityInput.value = 1;
    
    checkAchievements();
    updateUI();
    
    // Show success feedback
    showNotification(`Achat réussi: ${quantity} action(s) ${stock.name}`, 'success');
}

// Sell stock
function sellStock(symbol) {
    const stock = stocks.find(s => s.symbol === symbol);
    const position = gameState.portfolio[symbol];
    
    if (!position || position.quantity <= 0) {
        alert('Vous ne possédez pas cette action!');
        return;
    }

    const quantity = parseInt(document.getElementById(`qty-${symbol}`).value) || 1;
    
    if (quantity > position.quantity) {
        alert('Quantité insuffisante!');
        return;
    }

    const totalRevenue = stock.currentPrice * quantity;
    const profit = totalRevenue - (position.avgPrice * quantity);
    
    gameState.balance += totalRevenue;
    gameState.transactions++;
    gameState.totalProfit += profit;

    position.quantity -= quantity;
    position.totalCost = position.avgPrice * position.quantity;

    if (position.quantity === 0) {
        delete gameState.portfolio[symbol];
    }

    checkAchievements();
    updateUI();
}

// Save/Load system
function saveGame() {
    try {
        const saveData = {
            balance: gameState.balance,
            transactions: gameState.transactions,
            totalProfit: gameState.totalProfit,
            totalEarned: gameState.totalEarned,
            portfolio: gameState.portfolio,
            upgrades: gameState.upgrades,
            achievements: gameState.achievements,
            eventLog: gameState.eventLog,
            favorites: gameState.favorites,
            priceAlerts: gameState.priceAlerts,
            timestamp: Date.now()
        };
        
        localStorage.setItem('bourseGameSave', JSON.stringify(saveData));
        showNotification('Partie sauvegardée!', 'success');
        return true;
    } catch (e) {
        showNotification('Erreur lors de la sauvegarde', 'error');
        console.error('Save error:', e);
        return false;
    }
}

function loadGame() {
    try {
        const saveData = localStorage.getItem('bourseGameSave');
        
        if (!saveData) {
            console.log('No save data found');
            return false;
        }
        
        const data = JSON.parse(saveData);
        
        // Validate save data
        if (typeof data.balance !== 'number') {
            throw new Error('Invalid save data: balance missing');
        }
        
        gameState.balance = data.balance || 10.00;
        gameState.transactions = data.transactions || 0;
        gameState.totalProfit = data.totalProfit || 0;
        gameState.totalEarned = data.totalEarned || 0;
        gameState.portfolio = data.portfolio || {};
        gameState.upgrades = data.upgrades || gameState.upgrades;
        gameState.achievements = data.achievements || gameState.achievements;
        gameState.eventLog = data.eventLog || [];
        gameState.favorites = data.favorites || [];
        gameState.priceAlerts = data.priceAlerts || [];
        
        updateUI();
        showNotification('Partie chargée avec succès!', 'success');
        console.log('Game loaded successfully');
        return true;
    } catch (e) {
        showNotification('Erreur lors du chargement - Nouvelle partie', 'error');
        console.error('Load error:', e);
        // Clear corrupted save
        localStorage.removeItem('bourseGameSave');
        return false;
    }
}

function resetGame() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser votre partie? Toute la progression sera perdue.')) {
        localStorage.removeItem('bourseGameSave');
        location.reload();
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Render portfolio
function renderPortfolio() {
    const container = document.getElementById('portfolio-container');
    
    const symbols = Object.keys(gameState.portfolio);
    
    if (symbols.length === 0) {
        container.innerHTML = '<div class="empty-message">Aucune action dans votre portefeuille</div>';
        return;
    }

    container.innerHTML = '';
    symbols.forEach(symbol => {
        const stock = stocks.find(s => s.symbol === symbol);
        const position = gameState.portfolio[symbol];
        const currentValue = stock.currentPrice * position.quantity;
        const profit = currentValue - position.totalCost;
        const profitPercent = ((stock.currentPrice - position.avgPrice) / position.avgPrice) * 100;
        const profitClass = profit >= 0 ? 'positive' : 'negative';
        
        // Calculate price difference from purchase
        const priceDiff = stock.currentPrice - position.avgPrice;
        const priceDiffPercent = (priceDiff / position.avgPrice) * 100;
        const priceDiffClass = priceDiff >= 0 ? 'positive' : 'negative';

        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <div class="portfolio-info">
                <div class="portfolio-stock-name">${stock.name} (${symbol})</div>
                <div class="portfolio-details">
                    ${position.quantity} actions | Acheté à: ${position.avgPrice.toFixed(2)} µ | Actuel: ${stock.currentPrice.toFixed(2)} µ
                </div>
                <div class="price-reference ${priceDiffClass}">
                    ${priceDiff >= 0 ? '▲' : '▼'} ${Math.abs(priceDiff).toFixed(2)} µ (${priceDiffPercent >= 0 ? '+' : ''}${priceDiffPercent.toFixed(2)}%)
                </div>
            </div>
            <div class="portfolio-profit ${profitClass}">
                <div>${profit >= 0 ? '+' : ''}${profit.toFixed(2)} µ</div>
                <div style="font-size: 0.85em; margin-top: 5px;">${profitPercent >= 0 ? '+' : ''}${profitPercent.toFixed(2)}%</div>
            </div>
        `;
        container.appendChild(portfolioItem);
    });
}

// Render upgrades
function renderUpgrades() {
    const container = document.getElementById('upgrades-container');
    container.innerHTML = '';

    const upgrades = [
        {
            id: 'marketAnalysis',
            name: 'Analyse de Marché',
            description: 'Améliore votre capacité à analyser les tendances du marché',
            effect: (level) => `Réduction de 5% des frais de transaction (Niveau ${level})`,
            cost: (level) => Math.floor(50 * Math.pow(1.5, level))
        },
        {
            id: 'insiderInfo',
            name: 'Informations Privilégiées',
            description: 'Accès à des informations confidentielles sur les actions',
            effect: (level) => `Chance de +10% de gain par transaction (Niveau ${level})`,
            cost: (level) => Math.floor(150 * Math.pow(1.6, level))
        },
        {
            id: 'autoTrader',
            name: 'Trader Automatique',
            description: 'Un algorithme qui trade pour vous automatiquement',
            effect: (level) => `Gain passif de ${level * 0.5} µ par seconde (Niveau ${level})`,
            cost: (level) => Math.floor(500 * Math.pow(1.7, level))
        },
        {
            id: 'volatilityPredictor',
            name: 'Prédicteur de Volatilité',
            description: 'Anticipe les mouvements de prix avant qu\'ils ne se produisent',
            effect: (level) => `Visibilité sur ${Math.min(level * 2, 10)} secondes futures (Niveau ${level})`,
            cost: (level) => Math.floor(1000 * Math.pow(1.8, level))
        },
        {
            id: 'stockScanner',
            name: 'Scanner d\'Actions',
            description: 'Permet de voir plus d\'actions simultanément',
            effect: (level) => `${5 + level * 2} actions par page (Niveau ${level})`,
            cost: (level) => Math.floor(2000 * Math.pow(2, level))
        },
        {
            id: 'priceAlert',
            name: 'Alertes de Prix',
            description: 'Recevez des notifications quand un prix atteint un seuil',
            effect: (level) => `${level + 1} alertes actives simultanément (Niveau ${level})`,
            cost: (level) => Math.floor(750 * Math.pow(1.7, level))
        },
        {
            id: 'favoriteStocks',
            name: 'Actions Favorites',
            description: 'Marquez vos actions préférées pour un accès rapide',
            effect: (level) => `Accès à ${level + 2} favoris (Niveau ${level})`,
            cost: (level) => Math.floor(300 * Math.pow(1.5, level))
        }
    ];

    upgrades.forEach(upgrade => {
        // Vérifier que l'upgrade existe dans gameState
        if (!gameState.upgrades[upgrade.id]) {
            console.warn(`Upgrade ${upgrade.id} not found in gameState`);
            return;
        }
        
        const level = gameState.upgrades[upgrade.id].level || 0;
        const cost = upgrade.cost(level);
        const canAfford = gameState.balance >= cost;

        const upgradeCard = document.createElement('div');
        upgradeCard.className = 'upgrade-card';
        upgradeCard.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-name">${upgrade.name}</span>
                <span class="upgrade-level">Niveau ${level}</span>
            </div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-effect">${upgrade.effect(level + 1)}</div>
            <div class="upgrade-cost">Coût: ${cost.toFixed(2)} µ</div>
            <button class="btn-upgrade" onclick="buyUpgrade('${upgrade.id}')" ${!canAfford ? 'disabled' : ''}>
                Améliorer
            </button>
        `;
        container.appendChild(upgradeCard);
    });
}

// Toggle favorite stock
function toggleFavorite(symbol) {
    const index = gameState.favorites.indexOf(symbol);
    
    if (index > -1) {
        gameState.favorites.splice(index, 1);
        showNotification('Retiré des favoris', 'success');
    } else {
        const maxFavorites = gameState.upgrades.favoriteStocks.level + 2;
        if (gameState.favorites.length >= maxFavorites) {
            alert(`Maximum ${maxFavorites} favoris autorisés! Améliorez "Actions Favorites" pour en avoir plus.`);
            return;
        }
        gameState.favorites.push(symbol);
        showNotification('Ajouté aux favoris!', 'success');
    }
    
    updateUI();
}

// Set price alert
function setPriceAlert(symbol) {
    const stock = stocks.find(s => s.symbol === symbol);
    const targetPrice = prompt(`Entrez le prix cible pour ${stock.name} (actuel: ${stock.currentPrice.toFixed(2)} µ):`);
    
    if (targetPrice === null) return;
    
    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
        alert('Prix invalide!');
        return;
    }
    
    const maxAlerts = gameState.upgrades.priceAlert.level + 1;
    if (gameState.priceAlerts.length >= maxAlerts) {
        alert(`Maximum ${maxAlerts} alertes autorisées! Améliorez "Alertes de Prix" pour en avoir plus.`);
        return;
    }
    
    gameState.priceAlerts.push({
        symbol: symbol,
        targetPrice: price,
        condition: price > stock.currentPrice ? 'above' : 'below'
    });
    
    showNotification(`Alerte créée: ${stock.name} à ${price.toFixed(2)} µ`, 'success');
    updateUI();
}

// Check price alerts
function checkPriceAlerts() {
    gameState.priceAlerts.forEach((alert, index) => {
        const stock = stocks.find(s => s.symbol === alert.symbol);
        if (!stock) return;
        
        const triggered = (alert.condition === 'above' && stock.currentPrice >= alert.targetPrice) ||
                         (alert.condition === 'below' && stock.currentPrice <= alert.targetPrice);
        
        if (triggered) {
            showNotification(`🔔 Alerte: ${stock.name} a atteint ${alert.targetPrice.toFixed(2)} µ!`, 'success');
            gameState.priceAlerts.splice(index, 1);
        }
    });
}

// Buy upgrade
function buyUpgrade(upgradeId) {
    const upgrade = gameState.upgrades[upgradeId];
    const level = upgrade.level;
    
    // Calculate cost based on upgrade type (matching renderUpgrades)
    let cost;
    switch(upgradeId) {
        case 'marketAnalysis':
            cost = Math.floor(50 * Math.pow(1.5, level));
            break;
        case 'insiderInfo':
            cost = Math.floor(150 * Math.pow(1.6, level));
            break;
        case 'autoTrader':
            cost = Math.floor(500 * Math.pow(1.7, level));
            break;
        case 'volatilityPredictor':
            cost = Math.floor(1000 * Math.pow(1.8, level));
            break;
        case 'stockScanner':
            cost = Math.floor(2000 * Math.pow(2, level));
            break;
        case 'priceAlert':
            cost = Math.floor(750 * Math.pow(1.7, level));
            break;
        case 'favoriteStocks':
            cost = Math.floor(300 * Math.pow(1.5, level));
            break;
        default:
            cost = Math.floor(50 * Math.pow(1.5, level));
    }

    if (gameState.balance < cost) {
        alert('Fonds insuffisants!');
        return;
    }

    gameState.balance -= cost;
    upgrade.level++;
    
    // Update stocks per page if stockScanner was upgraded
    if (upgradeId === 'stockScanner') {
        gameState.stocksPerPage = 5 + upgrade.level * 2;
        gameState.currentPage = 0; // Reset to first page
    }
    
    checkAchievements();
    updateUI();
}

// Render alerts
function renderAlerts() {
    const container = document.getElementById('alerts-container');
    if (!container) return;
    
    if (gameState.priceAlerts.length === 0) {
        container.innerHTML = '<div class="empty-message">Aucune alerte active</div>';
        return;
    }
    
    container.innerHTML = '';
    gameState.priceAlerts.forEach((alert, index) => {
        const stock = stocks.find(s => s.symbol === alert.symbol);
        if (!stock) return;
        
        const alertItem = document.createElement('div');
        alertItem.className = 'alert-item';
        alertItem.innerHTML = `
            <div class="alert-info">
                <strong>${stock.name}</strong>
                <div>${alert.condition === 'above' ? '↑' : '↓'} ${alert.targetPrice.toFixed(2)} µ</div>
            </div>
            <button class="btn-remove" onclick="removeAlert(${index})">✕</button>
        `;
        container.appendChild(alertItem);
    });
}

// Render favorites
function renderFavorites() {
    const container = document.getElementById('favorites-container');
    if (!container) return;
    
    if (gameState.favorites.length === 0) {
        container.innerHTML = '<div class="empty-message">Aucun favori</div>';
        return;
    }
    
    container.innerHTML = '';
    gameState.favorites.forEach(symbol => {
        const stock = stocks.find(s => s.symbol === symbol);
        if (!stock) return;
        
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <div class="favorite-info">
                <strong>${stock.name}</strong>
                <div>${formatNumber(stock.currentPrice)}</div>
            </div>
            <button class="btn-remove" onclick="toggleFavorite('${symbol}')">✕</button>
        `;
        container.appendChild(favoriteItem);
    });
}

// Remove alert
function removeAlert(index) {
    gameState.priceAlerts.splice(index, 1);
    showNotification('Alerte supprimée', 'success');
    updateUI();
}

// Update UI
function updateUI() {
    document.getElementById('balance').textContent = gameState.balance.toFixed(2);
    document.getElementById('transactions').textContent = gameState.transactions;
    document.getElementById('total-profit').textContent = gameState.totalProfit.toFixed(2);
    
    // Calculate portfolio value
    let portfolioValue = 0;
    Object.keys(gameState.portfolio).forEach(symbol => {
        const stock = stocks.find(s => s.symbol === symbol);
        const position = gameState.portfolio[symbol];
        portfolioValue += stock.currentPrice * position.quantity;
    });
    document.getElementById('portfolio-value').textContent = portfolioValue.toFixed(2);

    renderPortfolio();
    renderUpgrades();
    renderAlerts();
    renderFavorites();
}

// Passive income from autoTrader
function applyPassiveIncome() {
    const autoTraderLevel = gameState.upgrades.autoTrader.level;
    if (autoTraderLevel > 0) {
        const income = autoTraderLevel * 0.5;
        gameState.balance += income;
        updateUI();
    }
}

// Game loop
function gameLoop() {
    updateStockPrices();
    renderStocks();
    updateUI();
}

// Auto-save every 30 seconds
function autoSave() {
    saveGame();
}

// Register service worker for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Initialize game
function initGame() {
    // Register service worker
    registerServiceWorker();
    
    // Try to load saved game
    const hasSave = loadGame();
    
    if (!hasSave) {
        renderStocks();
        renderPortfolio();
        renderUpgrades();
        updateUI();
    }

    // Update prices every 1 second (plus fréquent pour plus d'action)
    setInterval(gameLoop, 1000);

    // Apply passive income every second
    setInterval(applyPassiveIncome, 1000);

    // Auto-save every 30 seconds
    setInterval(autoSave, 30000);

    // Show welcome message
    setTimeout(() => {
        showNotification('Bienvenue dans Bourse Game! 💰', 'success');
    }, 500);
}

// Start game when page loads
window.addEventListener('load', initGame);
