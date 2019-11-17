// Using MiniPOW to control the MiniPOW Robot (Shiun)
// Copyright (c) 2019 Mason E&D. Copy-right All Rights Reserved. No commercial use．　
// FB link : https://www.facebook.com/mason.chen.1420
//% weight=12 color=#ff8533 icon="\uf2d6" block="Q-ter11"
namespace MiniPOW {
        
    let a = 0
    let b = 0
    let c = 0
    let d = [0,0,0]
    let f = [-24, -3, 6, -3, -24, -45, -54, -45, -24, 180]   
    let g = [-8, -14, -27, -42, -48, -42, -28, -14, -8, 180]
    let i = [16, 37, 46, 37, 16, -5, -14, -5, 16, 180]
    let k = [-8, -2, 12, 26, 32, 26, 13, -2, -8, 180]
    let h = [-16, -6, 20, 34, 40, 34, 20, 6, 0, 180]
    let e = [24, -6, -20, -34, -40, -34, -20, -6, 0, 180]
    let n = [-1, 20, 29, 20, -1, -22, -31, -22, -1, 180]
    let p = [16, 7, -10, -35, -44, -35, -14, 7, 16, 180]
    let q = [11, 25, 31, 25, 11, -3, -9, -3, 11, 180]
    let l = [5, -6, -20, -34, -40, -34, -20, -6, 0, 180]
    let m = [15, 6, -15, -36, -45, -36, -15, 6, 15, 180]
    let r = [0,0,0,0,0,0,0,0,0, 100]
    let t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180 ]
    let u = [0, 30, 0, 30, 0, 0, 0, 0, 0, 30, 0, 30, 0, 0, 180 ]
    let v = [  0, 20, 20, 20, 20, 20, 10,  0,  0, 180 ]
    let w = [  0,  0,  0,  0,  0,  0,  0,  0,  0, 180 ]
    let s = [0, 0, 0, 0, 0, -30, 0, -30, 0, -30, 0, -30, 0, 0, 180 ]
    let x = [  0, 20,  -30, 20, -30, 20, 10,  0,  0, 180 ]
    let o = [4, 21, 30, 21, 0, -21, -30, -21, 0, 180]
    let y = 0

    let count = 0
    let tmp_cnt = 0
    let m_step = 0
    let data_cnt = 0
    let time = ""
    let s3 = ""
    let s2 = ""
    let s1 = ""
    let s0 = ""
    let run_s = 0
   
    export enum snum {
        Middle = 0,
        Fast = 1,
        Slow = 2,
        Editor = 3, 
    }

    export enum dnum {
        Stop = 0,
        Forward = 1,
        Backward = 2,
        Left = 3,
        Right = 4,
        Say_hi = 5,
    }
        
    //% blockId="set_offset" block="Set offset - |P0 %_cal_0|P1 %_cal_1|P2 %_cal_2"
    //% weight=90
    export function set_offset(_cal_0: number, _cal_1: number, _cal_2: number): void {
        d[0] = _cal_0;
        d[1] = _cal_1;
        d[2] = _cal_2;
    }

    function s90(s: number, angle: number) {
        if (s==3){
        pins.servoWritePin(AnalogPin.P0, angle + d[0])
        }
        if (s==1){
        pins.servoWritePin(AnalogPin.P1, angle + d[1])
        }
        if (s==0){
        pins.servoWritePin(AnalogPin.P2, angle + d[2])
        }
    }
      
     /**   
     * Motion Editor block for using editor to control 
      */
    //% blockId="motion editor" block="For motion editor -|Receive data %r_data"
    //% blockGap=1 weight=9 
     export function motion_editor(r_data: string): void { 
    s0 = ""
    s1 = ""
    s2 = ""
    s3 = ""
    time = ""
    data_cnt = 0
    for (let index = 0; index <= r_data.length - 1; index++) {
        if (r_data.charAt(index).compare(",") == 0) {
            data_cnt += 1
        } else {
            if (data_cnt == 0) {
                s0 = "" + s0 + r_data.charAt(index)
            }
            if (data_cnt == 1) {
                s1 = "" + s1 + r_data.charAt(index)
            }
            if (data_cnt == 2) {
                s2 = "" + s2 + r_data.charAt(index)
            }
            if (data_cnt == 3) {
                s3 = "" + s3 + r_data.charAt(index)
            }
            if (data_cnt == 4) {
                time = "" + time + r_data.charAt(index)
            }
        }
    }
    pins.servoWritePin(AnalogPin.P0, parseFloat(s0)+ d[0])
    basic.pause(parseFloat(time) / 4)
    pins.servoWritePin(AnalogPin.P1, parseFloat(s1)+ d[1])
    basic.pause(parseFloat(time) / 4)
    pins.servoWritePin(AnalogPin.P2, parseFloat(s2)+ d[2])
    basic.pause(parseFloat(time) / 4)
}
  function mrun(aa: number[], bb: number[],cc: number[],dd: number[],ll: number): void {
      if (run_s == 0) {
        run_s = 1        
        for (let i = 0; i < ll; i++) {
                for (let il = 0; il <= count - 1; il++) {
                    c = aa[0] + 90+Math.idiv(aa[1] * (il + 1) , count)
                    b = aa[0] + 90+bb[0]+Math.idiv((bb[1]-bb[0]) * (il + 1) , count)
                    a = aa[0] + 90+cc[0]+Math.idiv((cc[1]-cc[0]) * (il + 1) , count)
                    s90(3,c)
                    s90(1,b)
                    s90(0,a)
                    y = aa[0] + 90+dd[0]+Math.idiv(dd[1] * (il + 1) , count)
                   basic.pause(10)
                }
            for (let ml = 1; ml <= m_step - 3; ml++) {
                for (let il = 0; il <= count - 1; il++) {
                    tmp_cnt = ml + 1
                    c = aa[0] + 90+aa[ml] + Math.idiv((aa[tmp_cnt] - aa[ml]) * (il + 1) , count)
                    b = aa[0] + 90+bb[ml] + Math.idiv((bb[tmp_cnt] - bb[ml]) * (il + 1) , count)
                    a = aa[0] + 90+cc[ml] + Math.idiv((cc[tmp_cnt] - cc[ml]) * (il + 1) , count)
                    s90(3,c)
                    s90(1,b)
                    s90(0,a)
                    y = aa[0] + 90+dd[ml]+Math.idiv((dd[tmp_cnt] - dd[ml]) * (il + 1) , count)
                    basic.pause(10)
                }
            }
        }	 
                for (let il = 0; il <= count - 1; il++) {
                    c = aa[0] + 90+Math.idiv((0- aa[0]) * (il + 1) , count)
                    b = aa[0] + 90+bb[0] +Math.idiv((0) * (il + 1) , count)
                    a = aa[0] + 90+cc[0] +Math.idiv((0- aa[0]-cc[0]) * (il + 1) , count)
                    s90(3,c)
                    s90(1,b)
                    s90(0,a)
                    y = aa[0] + 90+Math.idiv((0- dd[0]) * (il + 1) , count)
                    basic.pause(10)
                }
               run_s = 0
      }
   }
  
   function srun(aa: number[], bb: number[],cc: number[],dd: number[],ll: number): void {
      if (run_s == 0) {
        run_s = 1     
        if (count == 99) {
          count = aa[m_step-1] /10*0.6;
        }
        for (let i = 0; i < ll; i++) {
                for (let il = 0; il <= count - 1; il++) {
                    c = aa[0] + 90+Math.idiv(aa[1] * (il + 1) , count)
                    b = aa[0] + 90+bb[0]+Math.idiv((bb[1]-bb[0]) * (il + 1) , count)
                    a = aa[0] + 90+cc[0]+Math.idiv((cc[1]-cc[0]) * (il + 1) , count)
                    s90(3,c)
                    s90(1,b)
                    s90(0,a)
                    y = aa[0] + 90+dd[0]+Math.idiv(dd[1] * (il + 1) , count)
                   basic.pause(10)
                }
            if (m_step >= 4) {
               for (let ml = 1; ml <= m_step - 4; ml++) {
                for (let il = 0; il <= count - 1; il++) {
                    tmp_cnt = ml + 1
                    c = aa[0] + 90+aa[ml] + Math.idiv((aa[tmp_cnt] - aa[ml]) * (il + 1) , count)
                    b = aa[0] + 90+bb[ml] + Math.idiv((bb[tmp_cnt] - bb[ml]) * (il + 1) , count)
                    a = aa[0] + 90+cc[ml] + Math.idiv((cc[tmp_cnt] - cc[ml]) * (il + 1) , count)
                    s90(3,c)
                    s90(1,b)
                    s90(0,a)
                    y = aa[0] + 90+dd[ml]+Math.idiv((dd[tmp_cnt] - dd[ml]) * (il + 1) , count)
                    basic.pause(10)
                }
              }
            }
        }	 
              run_s = 0
      }
   }
 
   /**
     * Start animation
     */
    //% blockId="start_animation" block="Animation - |Bright %bright"
    //% weight=95
  export function start_animation(bright:number): void {
       if (bright < 50) {
          bright = 50
       }
       led.setBrightness(bright) 
       s90(3,90)
       s90(1,90)
       s90(0,90)
basic.showLeds(`
    . # # # .
    . # . # .
    . # # # .
    . # . # .
    # # . # #
    `)
       s90(1,70)
basic.showLeds(`
    . # # # .
    . # # # .
    . # # # .
    # # . # .
    . # . # #
    `)
       s90(3,90)
       s90(0,110)
basic.showLeds(`
    . # # # .
    . # . # .
    . # # # .
    . # . # #
    # # . # .
    `)
       s90(3,70)
       s90(0,90)
basic.showLeds(`
    . # # # .
    . # # # .
    . # # # .
    # # . # .
    . # . # #
    `)
       s90(3,90)
       s90(0,110)
basic.showLeds(`
    . # # # .
    . # . # .
    . # # # .
    . # . # #
    # # . # .
    `)
       s90(3,90)
       s90(0,90)
basic.showLeds(`
    . # # # .
    . # # # .
    . # # # .
    . # . # .
    # # . # #
    `)
basic.showLeds(`
    . # # # .
    . # . # .
    . # # # .
    . # . # .
    # # . # #
    `)
basic.showLeds(`
    . . . . .
    . # . # .
    # # # # #
    # . . . #
    . # # # .
    `)
       s90(3,70)
       s90(0,110)
basic.showLeds(`
    . # . # .
    # # # # #
    # . . . #
    . # # # .
    . . . . .
    `)
       s90(3,90)
       s90(0,90)
basic.showLeds(`
    . . . . .
    . # . # .
    # # # # #
    # . . . #
    . # # # .
    `)
       s90(3,70)
       s90(0,110)
basic.showLeds(`
    . # . # .
    # # # # #
    # . . . #
    . # # # .
    . . . . .
    `)
    count = 15;
    m_step = 13
    mrun(s,t,u,v,1)  
    s90(3,90)
    s90(0,90)
    basic.showLeds(`
    . # . # .
    . # # # .
    # # # # #
    # . # . #
    . # # # .
    `)
    }
            
    /**
     * Shiun Robot basic motion extension
     */
    //% blockId="motion" block="Default motion - |Speed %speed|Motion %direction"
    //% blockGap=1 weight=80 
  export function motion(speed: snum, direction: dnum): void {
        
        if (speed == snum.Fast) {
          count = 10;
        } else if (speed == snum.Middle) {
          count = 20;
        } else if (speed == snum.Slow) {
          count = 30;
        } else {
          count = 5;
        }

      if (direction == dnum.Stop) {
        s90(0,90)
        s90(1,90)
        s90(2,90)
        s90(3,90)
          } else if (direction == dnum.Forward ) {
        m_step = h.length
        mrun(h,i,k,h,3)  
         } else if (direction == dnum.Backward ) {
        m_step = e.length
        mrun(e,f,g,f,3)  
         } else if (direction == dnum.Right ) {
        m_step = o.length
        mrun(o,p,q,q,3)  
         } else if (direction == dnum.Left ) {
        m_step = l.length
        mrun(l,m,n,n,3)  
        } else if (direction == dnum.Say_hi ) {
        m_step = v.length
        mrun(v,w,x,v,1)  
        } 
     }        

    /**
     * User motion extension
     * Input motion array P0/P1/P2 from motion editor
     */
    //% blockId="user_motion" block="User Motion|Speed %sp2|P0 %pa|P1 %pb|P2 %pc"
    //% blockGap=1 weight=70 blockExternalInputs=1
  export function user_motion(sp2: snum, pa:number[], pb:number[], pc:number[]): void {

        m_step = pa.length
        if (sp2 == snum.Fast) {
          count = 5;
        } else if (sp2 == snum.Middle) {
          count = 10;
        } else if (sp2 == snum.Slow) {
          count = 15;
        } else if (sp2 == snum.Editor) {
          count = 99;
        } else {
          count = 7;
        }        
        ssrun(pa,pb,pc,pb,1)  
     }        

}
