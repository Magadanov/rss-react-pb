export const Loader = ({
  loaderClass,
  ...rest
}: { loaderClass?: string } & React.HTMLAttributes<HTMLSpanElement>) => {
  const classes = 'loader ' + (loaderClass || '');
  return <span className={classes} {...rest}></span>;
};
