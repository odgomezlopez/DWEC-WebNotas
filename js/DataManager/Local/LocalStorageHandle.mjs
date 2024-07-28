class LocalStorageHandle {
    constructor(storageKey, defaultValue='[]') {
        this.storageKey = storageKey;
        this.defaultValue = defaultValue;
    }

    save(notesJson) {
        localStorage.setItem(this.storageKey, notesJson);
    }

    load() {
        return localStorage.getItem(this.storageKey) || this.defaultValue; 
    }
}

export { LocalStorageHandle };