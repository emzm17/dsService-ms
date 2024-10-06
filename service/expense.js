class expense {
    /**
     * Information about a transaction made on any Card
     * @param {string|null} amount - Expense made on the transaction
     * @param {string|null} merchant - Merchant name where the transaction has been made
     * @param {string|null} currency - Currency of the transaction
     */
    constructor(amount = null, merchant = null, currency = null) {
        this.amount = amount;
        this.merchant = merchant;
        this.currency = currency;
    }

    /**
     * Sets the amount for the transaction.
     * @param {string} amount - The amount of the expense.
     */
    setAmount(amount) {
        this.amount = amount;
    }

    /**
     * Sets the merchant for the transaction.
     * @param {string} merchant - The name of the merchant.
     */
    setMerchant(merchant) {
        this.merchant = merchant;
    }

    /**
     * Sets the currency for the transaction.
     * @param {string} currency - The currency used in the transaction.
     */
    setCurrency(currency) {
        this.currency = currency;
    }

    /**
     * Returns the object representation of the expense.
     * @returns {Object} - An object with the expense details.
     */
    toObject() {
        return {
            amount: this.amount,
            merchant: this.merchant,
            currency: this.currency,
        };
    }
}

module.exports=expense;