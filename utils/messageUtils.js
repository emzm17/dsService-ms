
const isBankSms=(message)=>{
        // List of keywords to search in the message
        const wordsToSearch = ["spent", "bank", "card"];
        
        // Create a regex pattern dynamically from the wordsToSearch array
        const pattern = new RegExp(`\\b(?:${wordsToSearch.map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'i');

        // Test if the message contains any of the keywords
        return pattern.test(message);
}

module.exports = isBankSms;
