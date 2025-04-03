# Tài liệu Xử lý Token và Chức năng Lọc

## 1. Xử lý Token Authentication

### Vấn đề:

- Token verification không hoạt động đúng sau đăng nhập
- Token không được lưu trữ và kiểm tra đúng cách

### Giải pháp:

1. Lưu token vào database khi đăng nhập
2. Kiểm tra token trong database khi verify
3. So sánh token từ request với token trong database

## 2. Chức năng Lọc Sản Phẩm

### Lọc theo phân khu:

```typescript
GET /can-ho/phan-khu/:id
```

- Frontend gọi API khi chọn phân khu
- Backend trả về căn hộ thuộc phân khu được chọn
- Cập nhật UI với danh sách đã lọc

### Lọc theo giá:

```typescript
GET /can-ho/filter?minPrice=xxx&maxPrice=xxx
GET /can-ho/sort?order=asc|desc
```

- Frontend gửi khoảng giá từ form
- Backend query theo điều kiện giá
- Hỗ trợ sắp xếp tăng/giảm

### Lọc theo tiêu chí đặc biệt:

```typescript
GET /can-ho/filter?type=popular|newest|hot
```

- Popular: Sắp xếp theo lượt xem
- Newest: Sắp xếp theo ngày đăng
- Hot Deals: Sắp xếp theo % giảm giá

## 3. Database Schema

```sql
ALTER TABLE can_ho
ADD luot_xem INT DEFAULT 0,
ADD ngay_dang TIMESTAMP,
ADD is_hot_deal BOOLEAN,
ADD giam_gia DECIMAL;
```

## 4. Quy trình hoạt động:

1. User chọn tiêu chí lọc
2. Frontend gọi API tương ứng
3. Backend thực hiện query
4. Frontend cập nhật UI với kết quả

## 5. Lưu ý quan trọng:

- Tạo index cho các cột dùng để lọc/sắp xếp
- Validate dữ liệu đầu vào
- Xử lý lỗi và loading state
- Tối ưu query performance
