# CSS Container Queries - Learning & Practice

Welcome to the CSS Container Queries tutorial! This interactive project will help you understand and practice using container queries in modern web development.

## 🎯 What are Container Queries?

Container queries allow you to apply styles to an element based on the size of its **container** rather than the viewport. This is a game-changer for building truly reusable, responsive components.

### Traditional Media Queries vs Container Queries

**Media Queries:**
```css
/* Responds to viewport width */
@media (min-width: 768px) {+
    .card { flex-direction: row; }
}
```

**Container Queries:**
```css
/* Responds to container width */
@container (min-width: 500px) {
    .card { flex-direction: row; }
}
```

## 📚 What You'll Learn

1. **Basic Container Queries** - How to set up containment contexts
2. **Container Names** - Target specific containers
3. **Container Query Units** - cqw, cqh, cqi, cqb, cqmin, cqmax
4. **Practical Examples** - Cards, grids, sidebars, and typography
5. **Real-world Applications** - Build responsive components

## 🚀 Getting Started

1. Open `index.html` in a modern browser (Chrome 105+, Safari 16+, Firefox 110+)
2. Resize the dashed containers by dragging their corners
3. Watch how components adapt to their container size
4. Try the practice exercises
5. Experiment with the CSS in `styles.css`

## 📖 Key Concepts

### 1. Container Type

Define a containment context:

```css
.container {
    container-type: inline-size; /* Query the inline dimension (width) */
}
```

Options:
- `inline-size` - Query inline axis (usually width)
- `size` - Query both dimensions
- `normal` - No container queries

### 2. Container Name

Give your container a name for targeted queries:

```css
.sidebar-wrapper {
    container-type: inline-size;
    container-name: sidebar;
}

@container sidebar (min-width: 600px) {
    /* Styles only apply when sidebar container is 600px+ */
}
```

### 3. Container Query Syntax

```css
@container [name] ([condition]) {
    /* styles */
}
```

Examples:
```css
/* Minimum width */
@container (min-width: 400px) { }

/* Maximum width */
@container (max-width: 600px) { }

/* Range */
@container (min-width: 400px) and (max-width: 800px) { }

/* Named container */
@container card (min-width: 500px) { }
```

### 4. Container Query Units

Use these units to size elements relative to their container:

- `cqw` - 1% of container width
- `cqh` - 1% of container height
- `cqi` - 1% of container inline size
- `cqb` - 1% of container block size
- `cqmin` - Smaller of cqi or cqb
- `cqmax` - Larger of cqi or cqb

Example:
```css
.responsive-heading {
    font-size: 5cqw; /* 5% of container width */
}
```

## 💡 Examples in This Project

### Example 1: Responsive Card
- Stacks vertically in narrow containers
- Switches to horizontal layout when wider
- Scales typography at different sizes

### Example 2: Product Grid
- 1 column in narrow containers
- 2 columns at 400px
- 3 columns at 600px
- 4 columns at 800px

### Example 3: Adaptive Sidebar
- Vertical navigation in narrow containers
- Horizontal sidebar layout when wider
- Increased spacing at larger sizes

### Example 4: Container Query Units
- Typography that scales with container size
- Demonstrates cqw units in action

## 🎓 Practice Exercises

Try these challenges:

1. **Color Changes**: Make the practice card change background color at 400px and 600px widths
2. **Element Visibility**: Hide/show elements at specific container sizes
3. **Spacing**: Use container units (cqw) for padding and margins
4. **Typography**: Create a heading that scales from 20px to 40px using clamp() and cqw
5. **Custom Component**: Build your own responsive component using container queries

## 🌟 Real-World Use Cases

Container queries are perfect for:

- **Component Libraries** - Build components that adapt to any context
- **Design Systems** - Create truly reusable design tokens
- **Responsive Cards** - Adapt to sidebar, main content, or modal contexts
- **Dashboard Widgets** - Widgets that work in any container size
- **Form Layouts** - Forms that adapt to available space
- **Grid Items** - Grid items that respond to their grid cell size

## 🔧 Browser Support

Container queries are supported in:
- Chrome 105+ (Sept 2022)
- Safari 16+ (Sept 2022)
- Firefox 110+ (Feb 2023)
- Edge 105+ (Sept 2022)

Check current support: [caniuse.com/css-container-queries](https://caniuse.com/css-container-queries)

## 📝 Best Practices

1. **Use semantic container names** - Makes code more maintainable
2. **Combine with CSS Grid/Flexbox** - For powerful layouts
3. **Use clamp() with cq units** - Prevents extreme scaling
4. **Test in different contexts** - Ensure components work everywhere
5. **Fallbacks** - Consider older browsers if needed

## 🔗 Resources

- [MDN: CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [CSS Tricks: Container Queries Guide](https://css-tricks.com/css-container-queries/)
- [web.dev: Container Queries](https://web.dev/new-responsive/)

## 🎨 Tips for Learning

1. Start by resizing the demo containers to see how components adapt
2. Read the CSS comments to understand each example
3. Modify the CSS values and see what happens
4. Complete the practice exercises
5. Build your own components from scratch

## 🤝 Next Steps

After mastering these basics:

1. Build a complete component library with container queries
2. Integrate with a framework (React, Vue, etc.)
3. Explore container query units in more depth
4. Create complex adaptive layouts
5. Combine with CSS custom properties for theming

Happy learning! 🚀
