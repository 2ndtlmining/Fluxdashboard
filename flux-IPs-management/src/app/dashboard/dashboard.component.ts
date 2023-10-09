import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import * as contants from '../Constants/constants.json';

//import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  OverviewData: any;
  ResourcesData: any;
  NodeProjection: any[] = [];
  NodeImageProjection: any;
  Rate: any = 0;
  data: any = [];
  ipValues: any = [];
  overviewTotal = 0;
  BenchMarkInfo: any;
  BenchMarkLatestInfo: any;

  FluxLatestInfo: any;
  FluxProjection: any;
  BlockHeight = 0;
  //Environment Variable

  tier = JSON.parse(JSON.stringify(contants)).tiers;
  Constant = JSON.parse(JSON.stringify(contants)).Constant;
  Wordpress = JSON.parse(JSON.stringify(contants)).Wordpress;
  Presearch = JSON.parse(JSON.stringify(contants)).Presearch;
  Kadena = JSON.parse(JSON.stringify(contants)).Kadena;
  constructor(private http: DashboardService) {}
  ngOnInit(): void {
    //Overview
    this.http.getData().subscribe((response) => {
      try {
        this.data = response.fluxNodes;
        this.ipValues = this.data.map((item: { ip: any }) => item.ip);
        this.OverviewData = this.data.filter((item: { ip: any }) =>
          this.ipValues.includes(item.ip)
        );
      } catch (error) {
        console.log('FluxNodes Projection Failed in getData()');
      }
    });

    this.http.getOverviewRateData().subscribe((response) => {
      try {
        this.Rate = response.data.rate;
      } catch (error) {
        console.log('Rate API Failed in getOverviewRateData()');
      }
    });

    this.http.getOverviewTotal().subscribe((response) => {
      try {
        this.overviewTotal = response.data.total;
      } catch (error) {
        console.log('Currency API Failed in getOverviewTotal()');
      }
    });
    //EndOverview
    this.http.getbenchmarkData().subscribe((response) => {
      try {
        this.ResourcesData = response.data
          .map((item: { benchmark: any }) => item.benchmark)
          .map((item: { bench: any }) => item.bench)
          .filter((item: { ipaddress: any }) =>
            this.ipValues.includes(item.ipaddress)
          );
        this.BenchMarkInfo = response.data
          .filter((item: { benchmark: { bench: any } }) =>
            item.benchmark.bench.ipaddress.includes(this.ipValues)
          )
          .map((item: { benchmark: any }) => item.benchmark)
          .map((item: { info: any }) => item.info);
      } catch (error) {
        console.log('BenchMark Projection Failed in getbenchmarkData()');
      }
    });

    this.http.getnodeData().subscribe((response) => {
      try {
        if (this.ipValues == undefined || this.ipValues.length <= 0) {
          this.ipValues = response.data
            .map((item: { node: any }) => item.node)
            .map((item: { status: any }) => item.status)
            .map((item: { ip: any }) => item.ip);
        }
        //var testip = response.data.map((item: { node: any; }) => item.node).map((item: { status: any; }) => item.status).map((item: { ip: any; }) => item.ip);//.filter((item: { ip: any; }) => item.ip.includes(this.ipValues));
        var Projection = response.data
          .map((item: { node: any }) => item.node)
          .map((item: { status: any }) => item.status);
        Projection.forEach((item: any) => {
          if (this.ipValues.includes(item.ip)) {
            this.NodeProjection.push(item);
          }
        });
      } catch (error) {
        console.log('Node Projection Failed in getnodeData()');
      }

      try {
        this.NodeImageProjection = response.data
          .filter((item: { node: { status: any } }) =>
            this.ipValues.includes(item.node.status.ip)
          )
          .map((item: { apps: any }) => item.apps)
          .map((item: { runningapps: any }) => item.runningapps)
          .flat();
        console.log(this.NodeImageProjection);
      } catch (error) {
        console.log('Exception on Node Image Projection');
      }
    });

    this.http.benchmarkinfo().subscribe((response) => {
      try {
        this.BenchMarkLatestInfo = response;
      } catch (error) {
        console.log('benchmarkinfo.json Failed in benchmarkinfo()');
      }
    });
    this.http.fluxinfo().subscribe((response) => {
      try {
        this.FluxLatestInfo = response;
      } catch (error) {
        console.log('Flux Info Failed in fluxinfo()');
      }
    });

    this.http.fluxProjection().subscribe((response) => {
      try {
        this.FluxProjection = response.data
          .map((item: { flux: any }) => item.flux)
          .filter((item: { ip: any }) => this.ipValues.includes(item.ip));
      } catch (error) {
        console.log('Flux Project Failed');
      }
    });
    this.http.BlockHeight().subscribe((response) => {
      try {
        this.BlockHeight = response.data.blocks;
      } catch (error) {
        console.log('Block Height Failed in BlockHeight()');
      }
    });
  }
  getCUMULUS() {
    if (this.OverviewData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const cumulusData = this.OverviewData.filter(
        (item: { tier: string }) => item.tier === 'CUMULUS'
      );

      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return cumulusData.length;
    }
    return 0;
  }
  getNIMBUS() {
    if (this.OverviewData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const cumulusData = this.OverviewData.filter(
        (item: { tier: string }) => item.tier === 'NIMBUS'
      );

      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return cumulusData.length;
    }
    return 0;
  }
  getSTRATUS() {
    if (this.OverviewData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const cumulusData = this.OverviewData.filter(
        (item: { tier: string }) => item.tier === 'STRATUS'
      );

      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return cumulusData.length;
    }
    return 0;
  }
  getthunder() {
    if (this.ResourcesData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const thunderData = this.ResourcesData.filter(
        (item: { thunder: boolean }) => item.thunder === true
      );

      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return thunderData.length;
    }
    return 0;
  }

  getTotalNodes() {
    return (
      this.getCUMULUS() +
      this.getNIMBUS() +
      this.getSTRATUS() +
      this.getthunder()
    );
  }

  FluxNetwork() {
    if (this.OverviewData != undefined && this.overviewTotal > 0) {
      return this.getTotalNodes() / this.overviewTotal;
    }
    return 0;
  }
  getAppHosted() {
    if (this.NodeProjection != undefined) {
      return this.NodeProjection.length;
    }
    return 0;
  }
  AssetUnderManagement() {
    if (this.OverviewData != undefined && this.Rate > 0) {
      return (
        (this.getCUMULUS() * this.getCUMULUS() +
          this.getNIMBUS() * this.getNIMBUS() +
          this.getSTRATUS() * this.getSTRATUS() +
          this.getthunder() * this.getthunder()) *
        this.Rate
      );
    }
    return 0;
  }

  getFluxPrice() {
    if (this.Rate > 0) {
      return this.Rate;
    }
    return 0;
  }
  getCustomersCount() {
    if (this.FluxProjection != undefined) {
      const vCoresData = this.FluxProjection.filter(
        (item: { zelid: string }) =>
          item.zelid != null && item.zelid != undefined
      ).map((item: { zelid: string }) => item.zelid);
      return this.getDistinctElements(vCoresData).length;
    }
    return 0;
  }
  getDistinctElements<T>(array: T[]): T[] {
    return array.filter((value, index, self) => self.indexOf(value) === index);
  }
  //Resources
  getvCores() {
    if (this.ResourcesData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const vCoresData = this.ResourcesData.reduce(
        (sum: any, item: { cores: any }) => sum + item.cores,
        0
      );

      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return vCoresData;
    }
    return 0;
  }
  getCores() {
    if (this.ResourcesData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const vCoresData = this.ResourcesData.reduce(
        (sum: any, item: { real_cores: any }) => sum + item.real_cores,
        0
      );
      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return vCoresData;
    }
    return 0;
  }
  getRam() {
    if (this.ResourcesData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const vCoresData = this.ResourcesData.reduce(
        (sum: any, item: { ram: any }) => sum + item.ram,
        0
      );
      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return vCoresData;
    }
    return 0;
  }
  getSSD() {
    if (this.ResourcesData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const vCoresData = this.ResourcesData.reduce(
        (sum: any, item: { ssd: any }) => sum + item.ssd,
        0
      );

      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return vCoresData;
    }
    return 0;
  }
  getHDD() {
    if (this.ResourcesData != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      const vCoresData = this.ResourcesData.reduce(
        (sum: any, item: { hdd: any }) => sum + item.hdd,
        0
      );

      // Use the reduce method to calculate the sum of "amount" field in cumulusData
      return vCoresData;
    }
    return 0;
  }

  //EndResources
  //Notable Hosted Apps
  getWordPress() {
    if (this.NodeImageProjection != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      return this.NodeImageProjection.filter(
        (item: { Image: string }) => item.Image == this.Wordpress
      ).length;
    }
    return 0;
  }
  getPresearch() {
    if (this.NodeImageProjection != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      return this.NodeImageProjection.filter(
        (item: { Image: string }) => item.Image == this.Presearch
      ).length;
    }
    return 0;
  }
  getKadena() {
    if (this.NodeImageProjection != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      return this.NodeImageProjection.filter(
        (item: { Image: string }) => item.Image == this.Kadena
      ).length;
    }
    return 0;
  }
  getOther() {
    if (this.NodeImageProjection != undefined) {
      // Use the filter method to filter data based on "tier" equal to "CUMULUS"
      return this.NodeImageProjection.filter(
        (item: { Image: string }) =>
          item.Image != this.Wordpress &&
          item.Image != this.Presearch &&
          item.Image != this.Kadena
      ).length;
    }
    return 0;
  }
  //EndNotable Hosted Apps
  //Attention Area: X Nodes
  getClosedMaintenanceWindow() {
    if (this.NodeProjection != undefined && this.BlockHeight != undefined) {
      var count = 0;
      this.NodeProjection.forEach((item: any) => {
        if (
          this.Constant - (this.BlockHeight - item.last_confirmed_height) <
          0
        ) {
          count++;
        }
      });
      return count;
    }
    return 0;
  }
  getfluxLatestVersionCount() {
    if (this.FluxProjection != undefined && this.FluxLatestInfo != undefined) {
      const vCoresData = this.FluxProjection.filter(
        (item: { version: string }) =>
          item.version != this.FluxLatestInfo.version
      );
      return vCoresData.length;
    }
    return 0;
  }
  getBenchmarkLatestVersionCount() {
    if (
      this.BenchMarkInfo != undefined &&
      this.BenchMarkLatestInfo != undefined
    ) {
      const vCoresData = this.BenchMarkInfo.filter(
        (item: { version: string }) =>
          item.version != this.BenchMarkLatestInfo.version
      );
      return vCoresData.length;
    }
    return 0;
  }
  getNotConfirmedStatusCount() {
    if (this.NodeProjection != undefined) {
      const vCoresData = this.NodeProjection.filter(
        (item: { status: string }) => item.status != 'CONFIRMED'
      );
      return vCoresData.length;
    }
    return 0;
  }
  getFailedEPSCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.filter(
        (item: { eps: any }) => item.eps < this.tier
      );
      return vCoresData.length;
    }
    return 0;
  }
  getFailedDWSCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.map(
        (item: { disksinfo: any }) => item.disksinfo
      )
        .flat()
        .filter((item: { writespeed: number }) => item.writespeed < this.tier);
      return vCoresData.length;
    }
    return 0;
  }
  getFailedUploadCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.filter(
        (item: { upload_speed: any }) => item.upload_speed < this.tier
      );
      return vCoresData.length;
    }
    return 0;
  }
  getFailedDownloadCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.filter(
        (item: { download_speed: any }) => item.download_speed < this.tier
      );
      return vCoresData.length;
    }
    return 0;
  }
  getFailedRamCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.filter(
        (item: { ram: any }) => item.ram < this.tier
      );
      return vCoresData.length;
    }
    return 0;
  }
  getFailedSizeCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.map(
        (item: { disksinfo: any }) => item.disksinfo
      )
        .flat()
        .filter((item: { size: number }) => item.size < this.tier);
      return vCoresData.length;
    }
    return 0;
  }
  getFailedRealCoresCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.filter(
        (item: { real_cores: any }) => item.real_cores < this.tier
      );
      return vCoresData.length;
    }
    return 0;
  }
  getFailedCoresCount() {
    if (this.ResourcesData != undefined) {
      const vCoresData = this.ResourcesData.filter(
        (item: { cores: any }) => item.cores < this.tier
      );
      return vCoresData.length;
    }
    return 0;
  }
}
