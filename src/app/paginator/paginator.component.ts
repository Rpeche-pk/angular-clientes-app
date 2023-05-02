import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit ,OnChanges{
  
  @Input() paginadors: any;
  paginas: number[];

  //manejando rangos para que no desborde la paginacion
  desde:number;
  hasta: number;

  ngOnInit() {
    this.initPaginator();
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    let paginator = changes['paginadors'];
    if(paginator.previousValue) {
      this.initPaginator();
    }
  
  }
  
  private initPaginator():void{
    //this.desde= Math.min( Math.max(1, this.paginadors.number-4) , this.paginadors.totalPages-5);
    //this.hasta= Math.max(Math.min(this.paginadors.totalPages, this.paginadors.number+4),6);

    this.desde= Math.min(Math.max(1,this.paginadors.number-4),this.paginadors.totalPages-7);
    this.hasta= Math.min(this.paginadors.totalPages, this.desde+7);
    if(this.paginadors.totalPages>5){
      this.paginas = new Array(this.hasta-this.desde+1)
      .fill(0)
      .map((_valor, indice) => indice + this.desde); 
    }else{
      this.paginas = new Array(this.paginadors.totalPages)
      .fill(0)
      .map((_valor, indice) => indice + 1); 
    }
  }

}
