declare module "*.vue" {
  import { DefineComponent } from "vue";
  const Component: DefineComponent;
  export default Component;
}

declare module "*.ts" {
  const ExportedFunction: () => void;
  export default ExportedFunction;
}
