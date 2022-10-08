export default function Clipboard(text, setState) {

    var type = 'text/plain'
    var blob = new Blob([text], { type })
    var data = [new window.ClipboardItem({ [type]: blob })]

    navigator.clipboard.write(data).then(function () {
        setState(true)
    });
}