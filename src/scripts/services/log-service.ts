/// <reference path="../../../typings/master.d.ts" />

'use strict';

interface ILogger {
  error: (message: string, data?: any, title?: string) => void;
  info: (message: string, data?: any, title?: string) => void;
  success: (message: string, data?: any, title?: string) => void;
  warning: (message: string, data?: any, title?: string) => void;
  warn: (message: string, data?: any, title?: string) => void;
  debug: (message: string, data?: any, title?: string) => void;
  log: (message: string, data?: any, title?: string) => void;
}

class HttpLogger implements ILogger {
  constructor(private $injector: ng.auto.IInjectorService, private $log: ng.ILogService, private API_ROUTES) {}

  log(message: string, data?: any, title?: string): void {
    this.LogRemote('Log', message, data, title);
    this.$log.log('Log',  message, data);
  }

  debug(message: string, data?: any, title?: string): void {
    this.LogRemote('Debug', message, data, title);
    this.$log.debug('Debug',  message, data);
  }

  error(message: string, data?: any, title?: string): void {
    this.LogRemote('Error', message, data, title);
    this.$log.error('Error',  message, data);
  }

  info(message: string, data?: any, title?: string): void {
    this.LogRemote('Info', message, data, title);
    this.$log.info('Info', message, data);
  }

  success(message: string, data?: any, title?: string): void {
    this.LogRemote('Success', message, data, title);
    this.$log.info('Success', message, data);
  }

  warning(message: string, data?: any, title?: string): void {
    this.LogRemote('Warning', message, data, title);
    this.$log.warn('Warning', message, data);
  }

  warn(message: string, data?: any, title?: string): void {
    this.LogRemote('Warning', message, data, title);
    this.$log.warn('Warning', message, data);
  }

  private LogRemote(type: string, message: string, data?: any, title?: string){
    var $http = this.$injector.get<ng.IHttpService>('$http');
    var $q = this.$injector.get<ng.IQService>('$q');

    var deferred = $q.defer();
    $http.post(this.API_ROUTES.core_api.log, {
      type: type,
      message: message,
      data: data
    }).then((response)=> {
      deferred.resolve(response.data);
    }, (e:Error)=> {
      console.error(e);
      deferred.reject(e);
    });

    return deferred.promise;
  }
}
