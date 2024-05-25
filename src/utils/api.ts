function getElementValue(name:string){
    const elem = document.getElementById(name)
    switch (elem.tagName) {
        case 'INPUT':
            return (elem as HTMLInputElement).value
        default:
            return elem.innerText
    }
}

function validString(str:string)
{
    return str != null && str != ''
}
export {getElementValue, validString}