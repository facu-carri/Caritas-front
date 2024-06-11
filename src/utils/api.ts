function getElementValue(name:string){
    const elem = document.getElementById(name)
    if(!elem) return null
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

function formatDate(_date: string) {
    const date = new Date(_date)
    return date.toDateString()
  }

export {getElementValue, validString, formatDate}