import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as contants  from '../Constants/constants.json';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  // Function to fetch data from the API
  getData(): Observable<any> {
  //var apiUrl = 'https://explorer.runonflux.io/api/status?q=getFluxNodes';
    var apiUrl = JSON.parse(JSON.stringify(contants)).getFluxNodes;
    return this.http.get<any>(apiUrl);
  }

  getOverviewTotal(): Observable<any> {
    //var apiUrl = 'https://api.runonflux.io/daemon/getzelnodecount';
    var apiUrl = JSON.parse(JSON.stringify(contants)).getOverviewTotal;
      return this.http.get<any>(apiUrl);
    }

  getOverviewRateData(): Observable<any> {
      //var apiUrl = 'https://explorer.runonflux.io/api/currency';
      var apiUrl = JSON.parse(JSON.stringify(contants)).getOverviewRateData;
        return this.http.get<any>(apiUrl);
  }
  getbenchmarkData(): Observable<any> {
    //var apiUrl = 'https://stats.runonflux.io/fluxinfo?projection=benchmark.info,benchmark.bench.ipaddress,benchmark.bench.thunder,benchmark.bench.cores,benchmark.bench.real_cores,benchmark.bench.ram,benchmark.bench.ssd,benchmark.bench.hdd,benchmark.bench.eps,benchmark.bench.disksinfo,benchmark.bench.upload_speed,benchmark.bench.download_speed,benchmark.bench.disksinfo';
    var apiUrl = JSON.parse(JSON.stringify(contants)).getbenchmarkData;
      return this.http.get<any>(apiUrl);
}

getnodeData(): Observable<any> {
  //var apiUrl = 'https://stats.runonflux.io/fluxinfo?projection=node,apps.runningapps.Image';
  var apiUrl = JSON.parse(JSON.stringify(contants)).getnodeData;
    return this.http.get<any>(apiUrl);
}

benchmarkinfo(): Observable<any> {
  //var apiUrl = 'https://raw.githubusercontent.com/RunOnFlux/flux/master/helpers/benchmarkinfo.json';
  var apiUrl = JSON.parse(JSON.stringify(contants)).benchmarkinfo;
    return this.http.get<any>(apiUrl);
}

fluxinfo(): Observable<any> {
  //var apiUrl = 'https://raw.githubusercontent.com/RunOnFlux/flux/master/package.json';
  var apiUrl = JSON.parse(JSON.stringify(contants)).fluxinfo;
    return this.http.get<any>(apiUrl);
}

fluxProjection(): Observable<any> {
  //var apiUrl = 'https://stats.runonflux.io/fluxinfo?projection=flux.ip,flux.zelid,flux.version';
  var apiUrl = JSON.parse(JSON.stringify(contants)).fluxProjection;
    return this.http.get<any>(apiUrl);
}
BlockHeight(): Observable<any> {
  //var apiUrl = 'https://api.runonflux.io/daemon/getinfo';
  var apiUrl = JSON.parse(JSON.stringify(contants)).BlockHeight;
    return this.http.get<any>(apiUrl);
}

}
