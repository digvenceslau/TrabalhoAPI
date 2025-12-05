// State to track repeated clicks after a comparison
let _compareClickCount = 0;
let _lastA = null;
let _lastB = null;

function compareNumbers() {
    const el1 = document.getElementById('num1');
    const el2 = document.getElementById('num2');
    const resEl = document.getElementById('result');

    if (!resEl) return;

    const raw1 = el1 ? el1.value : '';
    const raw2 = el2 ? el2.value : '';

    const a = parseFloat(raw1);
    const b = parseFloat(raw2);

    if (isNaN(a) || isNaN(b)) {
        resEl.innerText = 'Please enter valid numbers in both fields.';
        return;
    }

    // If the inputs changed since the last comparison, reset the click counter
    if (_lastA !== null && (_lastA !== a || _lastB !== b)) {
        _compareClickCount = 0;
    }

    // Increase the counter for this click
    _compareClickCount += 1;

    // First click: perform and show comparison
    if (_compareClickCount === 1) {
        _lastA = a;
        _lastB = b;

        let relation = '';
        let biggest = a;
        let smallest = b;

        if (a > b) {
            relation = 'Number 1 is greater than Number 2.';
            biggest = a;
            smallest = b;
        } else if (a < b) {
            relation = 'Number 1 is smaller than Number 2.';
            biggest = b;
            smallest = a;
        } else {
            relation = 'Both numbers are equal.';
            biggest = smallest = a;
        }

        const message = `Result: ${relation}\n\nNumber 1: ${a}\nNumber 2: ${b}\n\nBiggest: ${biggest}\nSmallest: ${smallest}`;
        resEl.innerText = message;
        return;
    }

    // Subsequent clicks (after initial comparison) show escalating warnings and actions
    if (_compareClickCount === 2) {
        resEl.innerText = "I am shy — please don't click again.";
        return;
    }

    if (_compareClickCount === 3) {
        resEl.innerText = 'Stop.';
        return;
    }

    if (_compareClickCount === 4) {
        resEl.innerText = "If you click again I'll close the window you prick.";
        return;
    }

    if (_compareClickCount >= 5) {
        // Try to close the window; if the browser prevents it, provide a fallback
        try {
            // Some browsers allow `window.close()` only for windows opened by script
            window.close();
            // Additional attempt that sometimes works
            window.open('', '_self').close();
        } catch (e) {
            // Fallback: remove page content and show a closed message
            document.documentElement.innerHTML = '<p style="font-family:sans-serif;font-size:18px;padding:20px;">Window closed.</p>';
        }
    }
}

// Attach keyboard and input-change handlers once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const input1 = document.getElementById('num1');
    const input2 = document.getElementById('num2');

    // Only reset counters on input change; do NOT trigger compare on Enter.
    [input1, input2].forEach(input => {
        if (!input) return;
        // Changing the input resets the counter so the user can compare anew
        input.addEventListener('input', function () {
            _compareClickCount = 0;
            _lastA = null;
            _lastB = null;
            const resEl = document.getElementById('result');
            if (resEl) resEl.innerText = '';
        });
    });

    // Bind compareNumbers only to the explicit Compare button click
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.addEventListener('click', function () {
            compareNumbers();
        });
    }
});
