/// <reference path="Vehiculo.ts" />
namespace general{
    
    export class Camioneta extends general.Vehiculo{
        private cuatroXcuatro:boolean;
        
        constructor(id:number,marca:string,modelo:string,precio:number,cuatroXcuatro:boolean){
            super(id,marca,modelo,precio);
            this.cuatroXcuatro=cuatroXcuatro;
        }

        public getCuatroXcuatro(){
            return this.cuatroXcuatro;
        }

        public setCuatroXcuatro(){
            this.cuatroXcuatro = this.cuatroXcuatro;
        }
    }
}