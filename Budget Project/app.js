///////////
//// Use Module Pattern
//////////

// IIFE that returns an object
// IIFE is anonymous function wrapped in parantheses

/* Budget Controller */
const budgetController = (function() {
    
    const Expense = function(id, description, value) {
        this.id = id,
        this.description = description,
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id,
        this.description = description,
        this.value = value;
    };

    const calculateTotal = function(type) {
        let sum = 0;

        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });

        data.totals[type] = sum;
    };  

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {
            let newItem, ID;

            /* Creat new ID */
            // ID = last ID + 1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            


            /* create new item based on type */
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            /* push into data strucutre */
            data.allItems[type].push(newItem);

            /* return the new element */
            return newItem;
        },

        calculateBudget: function() {
            // 1. calc total income and total expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // 3. calc budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // 4. calc percentage of income already spent
            if (data.totals.inc > 0) {
                 data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
           
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc : data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },  

        testing: function() {
            console.log(data);
        }
        
        
    };

})();




/* UI Controller */
const UIController = (function(){

    /**
     * create a private object to hold the strings of query selectors
     * helps prevent errors and bugs since strings can get long
     * and if you need to change name of a class -- only need to change it once 
     * in the object and not manually on all of the querySelectors
     */
    const DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    };

    // create a public method so it can be used in other modules
    return {
        getInput: function() {
            /*
             * the global controller will call this method and wants to recieve all the values back in return
             * so need to return something (return keyword)
             * to return multiple values at once -- return an object with them as properties
             */
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc (income) or exp (expense)
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            let html, newHtml;
            // 1. create html string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class ="item__delete"><button class="item__delete--btn" ><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%" ><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            

            // 2. replace placeholder text with data recived from obj
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // 3. insert html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeEnd', newHtml);

        },

        clearFields: function() {
            let fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            // querySelectorAll returns a list -- lists don't have methods -- need to convert list to array to use methods on it
            // slice returns a copy of array or list
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, arr) {
                current.value = '';
                index.value = '';
                arr.value = '';
            });

            fieldsArr[0].focus();

        },

        displayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },

        /**
         * DOMStrings is a private obj -- need to pass into return obj
         * to expose it to public in order to make it accessible to other modules
         */
        getDOMStrings: function() {
            return DOMStrings;
        }
    };

})();




/*
* since the data module and UI module are completely separate -- separation of concerns
* need a third module to connect them
 */

/* Global app Contoller */

// pass the other two modules as parameters to the controller module allowing to use their code 
// budgetCtrl is budgetController and UICtrl is UIController 
const controller = (function (budgetCtrl, UICtrl) {

    /* set up a function that contains all event listeners to help contain them for better readability */
    const setupEventListeners = function() {
        /* get DOMStrings from UI controller */
        const DOM = UICtrl.getDOMStrings();

        /**
         * DOM.inputBtn selects the 'add__btn' because
         * our DOMStrings from UI controller is now stored in DOM variable
         * and inputBtn is stored in the DOMStrings
         */
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (e) {
            // only run on enter press
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            };

        });
    };


    const updateBudget = function() {
        // 1. calculate budget
        budgetController.calculateBudget();

        // 2. return the budget
        const budget = budgetController.getBudget();

        // 3. display budget on UI
        UIController.displayBudget(budget);

    };


    /* add new item */
    const ctrlAddItem = function() {
        let input, newItem;
        /* 1. get field input data */
        // call the getInput method from UI Controller 
        // returns an object with type, decription, and value
        input = UIController.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. add item to budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. add new item to UI
            UIController.addListItem(newItem, input.type);

            // 4. clear fields
            UIController.clearFields();

            // 5. calculate and update budget
            updateBudget();
        }

    };


    /**
     * need a way to actually call the setupEventListeners function
     * these are private functions only accessible inside module
     * return in object to expose it to public
     * the setupEventListeners function will only be called when init function is called
     */
    return {
        init: function() {
            console.log('the app has started');
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);


/**
 * need to call init function
 * event listeners will not work unless init is run
 * nothing will work without this init
 * the init function is a place where can place all code
 * we want to run when the application starts
 */
controller.init();