export function toCamelCase(string: string) {
    const words = string.toLowerCase().split(' ');
    if (words.length < 1) return string

    let camelCase = words[0]
    for (let i = 1; i < words.length; i++) {
        const wordCapitalize = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        camelCase += wordCapitalize
    }

    return camelCase;
}