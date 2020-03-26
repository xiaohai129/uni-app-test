declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
}

declare module "@/components/*";
declare module "@/pages/*";
declare module "@/apis/*";
declare module "@/state/*";

declare var wx:any;