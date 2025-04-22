module.exports = {
    templates: `${__dirname}/.hygen`,
    helpers: {
        className(name) {
            return this.changeCase.pascal(name);
        },
        tableName(name) {
            return this.inflection.transform(name, ['underscore', 'pluralize']);
        },
        apiTagName(name) {
            return this.inflection.transform(name, ['underscore', 'humanize', 'pluralize']);
        },
        controllerClassName(name) {
            return `${this.className(name)}Controller`;
        },
        serviceClassName(name) {
            return `${this.className(name)}Service`;
        },
        repositoryClassName(name) {
            return `${this.className(name)}Repository`;
        },
        entityClassName(name) {
            return `${this.className(name)}Entity`;
        },
        moduleClassName(name) {
            return `${this.className(name)}Module`;
        },
        folderName(name) {
            return this.inflection.transform(name, ['underscore', 'pluralize', 'dasherize']);
        },
        fileName(name) {
            return this.inflection.transform(name, ['underscore', 'dasherize']);
        },
        controllerFileName(name) {
            return `${this.fileName(name)}.controller`;
        },
        serviceFileName(name) {
            return `${this.fileName(name)}.service`;
        },
        repositoryFileName(name) {
            return `${this.fileName(name)}.repository`;
        },
        entityFileName(name) {
            return `${this.fileName(name)}.entity`;
        },
        moduleFileName(name) {
            return `${this.fileName(name)}.module`;
        },
        attributeInterfaceClassName(name) {
            return `I${this.className(name)}Attribute`;
        },
        attributeFileName(name) {
            return `${this.fileName(name)}-attribute.interface`;
        },
    }
}