class WordHighlighter {
    constructor(eventChannel, toaster) {
        this.eventChannel = eventChannel;
        this.toaster = toaster;
    }

    buildWordSet(onSuccess) {
        //console.log('buildWordSet this.wordset:', this.wordset);
        if (this.wordset) {
            console.log('buildWordSet this.wordset:', this.wordset);
            onSuccess();
            return;
        }
        console.log('buildWordSet');
        const highlighter = this;
        this.eventChannel.sendMessage({ action: 'highlight' }, event => {
            const response = event.data;
            if (response.type == "highlight-words-fetched") {
                highlighter.wordset = response.wordset;
                console.log(`buildWordSet: built wordset: ${highlighter.wordset}`);
                onSuccess();
            }
            else {
                this.toaster.$emit('add-error', {
                    message: 'Failed to read highlight deck: ' + response.message,
                    stack: response.stack,
                    isUserFacing: response.isUserFacing
                });
            }
        });
    }
}
