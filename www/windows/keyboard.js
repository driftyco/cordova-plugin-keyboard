var keyboardScrollDisabled = true;
var inputPane = Windows.UI.ViewManagement.InputPane.getForCurrentView();

var Keyboard = function () {
};

Keyboard.isVisible = false;

inputPane.addEventListener('hiding', function () {
    if (!Keyboard.isVisible) {
        return;
    }

    cordova.fireWindowEvent('keyboardWillHide');
    Keyboard.isVisible = false;
    cordova.fireWindowEvent('keyboardDidHide');
});

inputPane.addEventListener('showing', function (e) {
    if (Keyboard.isVisible) {
        return;
    }

    cordova.fireWindowEvent('keyboardWillShow', {
        keyboardHeight: e.occludedRect.height
    });
    if (keyboardScrollDisabled) {
        // this disables automatic scrolling of view contents to show focused control
        e.ensuredFocusedElementInView = true;
    }
    Keyboard.isVisible = true;
    cordova.fireWindowEvent('keyboardDidShow', {
        keyboardHeight: e.occludedRect.height
    });
});

Keyboard.hideFormAccessoryBar = Keyboard.hideKeyboardAccessoryBar = function (hide) {
    console.warn("Keyboard.hideFormAccessoryBar() not supported in Windows");
};

Keyboard.hide = function () {
    if (typeof inputPane.tryShow === 'function') {
        inputPane.tryHide();
    }
};

Keyboard.show = function () {
    if (typeof inputPane.tryShow === 'function') {
        inputPane.tryShow();
    }
};

Keyboard.setResizeMode = function (mode) {
    console.warn("Keyboard.setResizeMode() not supported in Windows");
};

module.exports = Keyboard;
