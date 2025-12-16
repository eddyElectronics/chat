# ตัวอย่างการแสดงผล Markdown

## คุณสมบัติที่รองรับ

### 1. หัวข้อ (Headings)
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### 2. ข้อความที่มีการจัดรูปแบบ

**ตัวหนา (Bold)**
*ตัวเอียง (Italic)*
~~ขีดฆ่า (Strikethrough)~~

### 3. รายการ (Lists)

#### Unordered List:
- รายการที่ 1
- รายการที่ 2
  - รายการย่อย 2.1
  - รายการย่อย 2.2
- รายการที่ 3

#### Ordered List:
1. ขั้นตอนที่ 1
2. ขั้นตอนที่ 2
3. ขั้นตอนที่ 3

### 4. โค้ด (Code)

#### Inline Code:
ใช้ `const message = "Hello World"` สำหรับตัวแปร

#### Code Blocks:

```javascript
// JavaScript Example
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet("World");
```

```python
# Python Example
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

```typescript
// TypeScript Example
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30
};
```

### 5. ลิงก์ (Links)

[เยี่ยมชม GitHub](https://github.com)

### 6. คำพูด (Blockquote)

> นี่คือข้อความอ้างอิง
> สามารถมีหลายบรรทัดได้

### 7. ตาราง (Tables)

| ชื่อ | อายุ | เมือง |
|------|------|-------|
| สมชาย | 25 | กรุงเทพ |
| สมหญิง | 28 | เชียงใหม่ |
| สมศักดิ์ | 30 | ภูเก็ต |

### 8. เส้นแบ่ง (Horizontal Rule)

---

### 9. รายการ Task (Task Lists)

- [x] งานที่เสร็จแล้ว
- [ ] งานที่ยังไม่เสร็จ
- [ ] งานที่กำลังทำ

## ตัวอย่างข้อความที่ซับซ้อน

คุณสามารถผสมผสานการใช้งานต่างๆ ได้ เช่น:

1. **ตัวหนา** และ *ตัวเอียง* ในประโยคเดียวกัน
2. ใช้ `inline code` ร่วมกับข้อความปกติ
3. สร้าง [ลิงก์](https://example.com) ในรายการ

### Code Example with Explanation

นี่คือตัวอย่างการสร้าง React Component:

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;
```

### Mathematical Expression (if supported)

Einstein's famous equation: E = mc²

### Nested Lists

1. ขั้นตอนหลัก
   - รายละเอียดเพิ่มเติม
   - ข้อมูลสำคัญ
     - รายละเอียดย่อย
     - ข้อมูลเสริม
2. ขั้นตอนถัดไป

---

## วิธีทดสอบ

1. เปิดแอปพลิเคชัน
2. ส่งข้อความที่มีรูปแบบ markdown
3. ตรวจสอบว่าแสดงผลถูกต้อง

**หมายเหตุ:** แอปพลิเคชันรองรับการแสดงผล markdown แบบ real-time ✨
