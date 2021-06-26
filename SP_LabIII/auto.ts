/// <reference path="Vehiculo.ts" />
namespace general{
    
    export class Auto extends general.Vehiculo{
        private cantidadPuertas:number;
        
        constructor(id:number,marca:string,modelo:string,precio:number,cantidadPuertas:number){
            super(id,marca,modelo,precio);
            this.cantidadPuertas=cantidadPuertas;
        }

        public getCantidadPuertas(){
            return this.cantidadPuertas;
        }

        public setCantidadPuertas(){
            this.cantidadPuertas = this.cantidadPuertas;
        }
    }
}