export const gridConfig = {

  // Defaults
  gridSize: 12, // columns
  gutterWidth: 1, // rem
  outerMargin: 1, // rem
  mediaQuery: 'only screen',
  container: {
    sm: 48, // rem
    md: 63, // rem
    lg: 76 // rem
  },
  
  breakpoints: {
    xs: 0, // em
    sm: 48, // em
    md: 63, // em
    lg: 75 // em
  },
  
  sidebarMaxWidth: 20,
  sidebarGap: 2
};

// MD Breakpoint with offset is used in sidebar and global css styles
export const mdOffset = gridConfig.breakpoints.md + 0;
