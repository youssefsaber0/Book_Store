export type ViewInfo = Readonly<{
  title?: string;
  icon?: string;
}>;

export type ViewInfoMap = Readonly<Record<string, ViewInfo | undefined>>;
export type RequiredViewInfoMap = Readonly<Record<string, Required<ViewInfo>>>;

const views: ViewInfoMap = {
  '/login': { icon: 'la la-file', title: 'Login' },
};

export default views;
