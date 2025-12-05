// Script for comparing two numbers when the compare button is clicked.
// Includes validation, equality/different cases, biggest/smallest results and
// escalating warnings for repeated clicks. Inputs changing resets the counter.

let _clickCount2 = 0;
let _lastA = null;
let _lastB = null;

function compareTwoNumbers() {
    const input1 = document.getElementById('num1');
    const input2 = document.getElementById('num2');
    const resEl = document.getElementById('result');

    if (!resEl || !input1 || !input2) return;

    const a = parseFloat(input1.value);
    const b = parseFloat(input2.value);

    if (isNaN(a) || isNaN(b)) {
        resEl.innerText = 'Please enter valid numbers in both fields.';
        return;
    }

    // If inputs have changed since last comparison, reset the click counter
    if (_lastA !== null && (_lastA !== a || _lastB !== b)) {
        _clickCount2 = 0;
    }

    _clickCount2 += 1;

    // First click: show comparison (bullet list output)
    if (_clickCount2 === 1) {
        _lastA = a; _lastB = b;
        const items = [];

        if (a === b) {
            items.push('The numbers are all equal');
            items.push(`Value: ${a}`);
            resEl.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
            return;
        }

        // Different
        const biggest = Math.max(a, b);
        const smallest = Math.min(a, b);
        const biggestLabel = (a === biggest) ? `Number 1 (${a})` : `Number 2 (${b})`;
        const smallestLabel = (a === smallest) ? `Number 1 (${a})` : `Number 2 (${b})`;
        items.push('The numbers are all different');
        items.push(`Biggest: ${biggestLabel}`);
        items.push(`Smallest: ${smallestLabel}`);
        resEl.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
        return;
    }

    // Repeated clicks: escalate warnings/actions
    if (_clickCount2 === 2) {
        resEl.innerText = "I am shy — please don't click again.";
        return;
    }
    if (_clickCount2 === 3) {
        resEl.innerText = 'Stop.';
        return;
    }
    if (_clickCount2 === 4) {
        resEl.innerText = "If you click again I'll close the window you prick.";
        return;
    }
    if (_clickCount2 >= 5) {
        try {
            window.close();
            window.open('', '_self').close();
        } catch (e) {
            document.documentElement.innerHTML = '<p style="font-family: Poppins, sans-serif; font-size:18px; padding:20px;">Window closed.</p>';
        }
    }
}

// Bind the compare function to the button and reset counter on input change
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('compareBtn');
    const i1 = document.getElementById('num1');
    const i2 = document.getElementById('num2');
    const res = document.getElementById('result');

    if (btn) btn.addEventListener('click', compareTwoNumbers);

    [i1, i2].forEach(i => {
        if (!i) return;
        i.addEventListener('input', function () {
            _clickCount2 = 0;
            _lastA = _lastB = null;
            if (res) res.innerText = '';
        });
    });
});