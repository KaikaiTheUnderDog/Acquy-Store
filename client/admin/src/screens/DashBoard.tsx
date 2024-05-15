import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getDashboardData,
} from '../../redux/actions/adminActions';
import { useIsFocused } from '@react-navigation/native';

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  fillShadowGradient: '#D22B2B',
  fillShadowGradientOpacity: 1,
  color: (opacity = 1) => `rgba(27, 18, 18, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForLabels: {
    fontWeight: 'bold',
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboardData, loading, error } = useSelector(
    (state) => state.dashboard
  );

  /*   const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getDashboardData());
    }
  }, [isFocused]); */

  const [sales, setSales] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [shippingOrdersCount, setShippingOrdersCount] = useState(0);
  const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [weeklySalesData, setWeeklySalesData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [monthlySalesData, setMonthlySalesData] = useState({
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  useEffect(() => {
    if (dashboardData) {
      setSales(dashboardData.sales.totalSales);
      setUserCount(dashboardData.userCount);
      setProductCount(dashboardData.productCount);

      const pendingOrders = dashboardData.orders.byStatus.find(
        (status) => status._id === 'Pending'
      );
      const shippingOrders = dashboardData.orders.byStatus.find(
        (status) => status._id === 'Shipping'
      );
      const deliveredOrders = dashboardData.orders.byStatus.find(
        (status) => status._id === 'Delivered'
      );
      const cancelledOrders = dashboardData.orders.byStatus.find(
        (status) => status._id === 'Cancelled'
      );

      setPendingOrdersCount(pendingOrders ? pendingOrders.count : 0);
      setShippingOrdersCount(shippingOrders ? shippingOrders.count : 0);
      setDeliveredOrdersCount(deliveredOrders ? deliveredOrders.count : 0);
      setTotalOrders(
        dashboardData.orders.total -
          (cancelledOrders ? cancelledOrders.count : 0)
      );

      setOrdersToday(dashboardData.orders.ordersToday);
      const daysMapping = [2, 3, 4, 5, 6, 7, 1];
      const salesData = daysMapping.map((day) => {
        const dayData = dashboardData.weeklySalesData.find(
          (d) => d._id === day
        );
        return dayData ? dayData.totalSales : 0;
      });

      setWeeklySalesData({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            data: salesData,
          },
        ],
      });

      const monthsMapping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const monthlySalesData = monthsMapping.map((month) => {
        const monthData = dashboardData.monthlySalesData.find(
          (m) => m._id === month
        );
        return monthData ? monthData.totalSales : 0;
      });

      setMonthlySalesData({
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            data: monthlySalesData,
          },
        ],
      });
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
      dispatch(clearErrors());
    }
  }, [dashboardData, error]);

  if (loading) {
    return <ActivityIndicator size={'large'}></ActivityIndicator>;
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.card, { backgroundColor: 'red' }]}>
        <Text style={[styles.cardTitle, { marginBottom: 0, color: 'white' }]}>
          Total Sales: {'      '}
          <Text style={{ fontSize: 35 }}>${sales.toFixed(2)}</Text>
        </Text>
      </View>
      <Text style={styles.header}>Overview</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Orders</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.orderText}>Pending: {pendingOrdersCount}</Text>
          <Text style={styles.orderText}>Shipping: {shippingOrdersCount}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.orderText}>
            Delivered: {deliveredOrdersCount}
          </Text>
          <Text style={styles.orderText}>Total: {totalOrders}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statText}>
            Users: <Text style={{ color: 'red' }}>{userCount}</Text>
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statText}>
            Orders today: <Text style={{ color: 'red' }}>{ordersToday}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statText}>
            Products: <Text style={{ color: 'red' }}>{productCount}</Text>
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statText}>
            Categories: <Text style={{ color: 'red' }}>20</Text>
          </Text>
        </View>
      </View>
      <Text style={styles.header}>Week sales</Text>
      <BarChart
        style={styles.chart}
        data={weeklySalesData}
        width={350}
        height={250}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <Text style={styles.header}>Monthly sales</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <BarChart
          style={styles.chart}
          data={monthlySalesData}
          width={600}
          height={250}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#eff3f6',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    alignSelf: 'center',
  },
  orders: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontSize: 20,
    color: '#4bc96b',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#eff3f6',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    elevation: 5,
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  chartContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 5,
    alignSelf: 'center',
    elevation: 5,
    marginBottom: 50,
  },
});

export default Dashboard;
