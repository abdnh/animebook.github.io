class WordHighlighter {
    buildWordSet(eventChannel, onSuccess) {
        if (this.wordset) {
            onSuccess();
            return;
        }
        console.log('buildWordSet');
        eventChannel.sendMessage({ action: 'highlight' }, event => {
            const response = event.data;
            if (response.type == "highlight-words-fetched") {
                this.wordset = response.wordset;
                console.log(`buildWordSet: built wordset: ${this.wordset}`);
                onSuccess();
            }
            else {
                toaster.$emit('add-error', {
                    message: 'Failed to read highlight deck: ' + response.message,
                    stack: response.stack,
                    isUserFacing: response.isUserFacing
                });
            }
        });
    }
}
