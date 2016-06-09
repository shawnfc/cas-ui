/// <reference path="../../../typings/master.d.ts" />

interface IZipService {
    extractAndParseZip(zipfile: any, fileName: string): string;
}

class ZipService implements IZipService {
    constructor(private $q: ng.IQService, private $log: HttpLogger, private JSZip) { }

    public extractAndParseZip(zipfile, fileName) {
        var deferred = this.$q.defer();

        var zip = new this.JSZip().load(zipfile);
        var file = zip.files[fileName];

        if (file == undefined)
            return null;

        if (fileName.indexOf('json') !== -1)
            return JSON.parse(file.asText());
        if (fileName.indexOf('png') !== -1 || fileName.indexOf('jpg') !== -1 || fileName.indexOf('jpeg') !== -1) {
            return file.asArrayBuffer();
        }
    }
}

angular.module("casUiServiceApp").service("JSZipUtil", ZipService);