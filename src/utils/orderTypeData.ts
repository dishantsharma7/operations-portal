export interface OrderTypeDataInterface {
    orderType: string;
  }
export const orderTypes:OrderTypeDataInterface[] = [
    {
        orderType: `dine_in`
    },
    {
        orderType:"delivery"
    },
    {
        orderType:"pickup"
    }
]