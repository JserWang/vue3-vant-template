# ScrollView

## Usage

```html
<scroll-view ref="scrollView" @scroll="handleScroll" @init="handleInit">
  <div ref="test1"></div>
  <div ref="test2"></div>
  <div ref="test3"></div>
</scroll-view>
```

```typescript
import { ScrollView, TScrollView } from '@/components/ScrollView';

export default defineComponent({
  components: { ScrollView },
  setup() {
    const scrollView = ref({}) as Ref<TScrollView>;
    const test3 = ref({}) as Ref<HTMLElement>;
    return {
      scrollView,
      test3,
    };
  },
  methods: {
    handleScroll() {
      console.log('handleScroll');
    },
    handleInit() {
      // scroll to y: 100px;
      // this.scrollView.scrollTo(0, 100);
      // scroll to element test2
      // this.scrollView.scrollToElement(this.test2);
      console.log('handleInit');
    },
  },
});
```
