import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Battery, BatteryCharging, Zap, CheckCircle, X } from "lucide-react";

// --- Product Data Definition ---
// NOTE: Make sure these URLs are correct and accessible
const productData = {
  ups: {
    title: "Inverter / UPS Systems",
    icon: Zap,
    items: [
      {
        brand: "Luminous",
        model: "Zelio+ 1100",
        description: "Smart Home UPS with Pure Sine Wave output, featuring an intuitive LCD display for status updates. Ideal for sensitive appliances.",
        features: ["Pure Sine Wave Output", "LCD Display", "MCB Protection", "Bypass Switch", "Fast Charging"],
        imageUrl: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/e00e04ea-edd2-41cc-aefb-d93a17aa3257_Zelio%20smart%201100%20inverter-1.png"
      },
      {
        brand: "Microtek",
        model: "Super Power 1100",
        description: "Advanced Digital UPS leveraging PWM technology for reliable power backup and efficient performance during outages.",
        features: ["Digital Display", "PWM Technology", "Auto Reset Function", "Overload Protection", "AVR (Automatic Voltage Regulation)"],
        imageUrl: "https://www.microtek.in/_next/image?url=https%3A%2F%2Fcms.microtek.in%2Fupload%2Fproduct%2FSuper-Power-Digital-UPS-Model-1100-12V-DG-1-1721624923451.jpg&w=1920&q=75"
      },
      {
        brand: "V-Guard",
        model: "Smart Pro 1200",
        description: "Intelligent Sine Wave UPS with Bluetooth connectivity for monitoring via a mobile app, plus features like Battery Gravity Builder.",
        features: ["Pure Sine Wave Output", "Bluetooth Mobile App", "Battery Gravity Builder", "Holiday Mode", "High Load Handling"],
        imageUrl: "https://www.vguard.in/uploads/product/smart-pro-1200-s-bg.jpg"
      },
      {
        brand: "Amaze",
        model: "AN 1275",
        description: "High-performance Sine Wave inverter designed for home use, offering fast charging and reliable operation even at low voltages.",
        features: ["Pure Sine Wave Output", "Fast Charging Capability", "Low Voltage Operation", "Compact Design", "Rugged Technology"],
        imageUrl: "https://www.amaze-india.com/data/product/amaze/an1275-pro/Amazon-card-1.webp"
      },
    ]
  },
  batteries: {
    title: "Inverter Batteries",
    icon: Battery,
    items: [
      {
        brand: "Amaron",
        model: "Current Tall Tubular 150Ah",
        description: "High heat tolerance Tall Tubular inverter battery known for its durability, long life, and low maintenance requirements.",
        features: ["Tall Tubular Design", "150 Ah Capacity", "Low Maintenance", "Long Life Cycle", "High Heat Tolerance"],
        imageUrl: "https://amaron-prod-images.s3.ap-south-1.amazonaws.com/inv-battery-front-image/AAM-CR-AR200TT54_CENTRE_1.jpg"
      },
      {
        brand: "Luminous",
        model: "Red Charge RC 18000TT",
        description: "Heavy-duty Tall Tubular battery offering high backup power, featuring 6 water level indicators for easy maintenance.",
        features: ["Tall Tubular Technology", "180 Ah Capacity", "6 Water Level Indicators", "High Backup Power", "Overcharge Tolerance"],
        imageUrl: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/5fd18ddd-431f-470c-b272-a52092353455_Red-Charge-Pro-18000-1.png"
      },
      {
        brand: "LivFast",
        model: "Maxximo Tall Tubular 160Ah",
        description: "Superior performance Tall Tubular battery designed for longer life and faster recharge cycles, backed by a solid warranty.",
        features: ["Tall Tubular Plates", "160 Ah Capacity", "Faster Recharge", "Extra Electrolyte Volume", "Good Warranty Terms"],
        // Corrected the Livfast image URL if the base64 string was unintentional. Replace with a real URL.
        imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEhIWEBUQFRIVEBcXERYVFhATFhYWFhYVFRYYHSghGBsmGxUVITEhJSkrLi4uFx82OTMsNygtOisBCgoKDg0OGxAQGzAmHyYtKy8uLTU3LSsxLTIwMCsuLS0rLzIrNS0tLTUvMC0vLSstLSstLS0tLS0rLi0tNS8tLf/AABEIAMoA+QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgECBAUHAwj/xABSEAABAwICBAYKDgcGBwEAAAABAAIDBBESIQUHMUEGEyJRYZEXUlNxgZKhwdHSFiMlMlRicpOisbKzw9MUNEJjgpThJDVkdIPiM3OjpMLw8RX/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAQMCBAUG/8QANREBAAECAgcGBQQCAwEAAAAAAAECAwQRBRIVITGh0UFRUmGBkRNxscHwMjRC4RTxU2KCIv/aAAwDAQACEQMRAD8A7igICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICC18gbtIF8hc2uUFyAgtMgvhuLnYL5nwILkBBaHgkgEEjbns76C5AQUa4HYb94oKoKEoAKCqChKCqAgICAgICAgICAgICAgICAgwNL2s3FbaTnz2I86iUxTrM9SgQYUwHHN57C30v6qE5bs2apQIMOlA4x/hv1qEzDMUoEGHowWae/zk7hzqITLMUoeFaLscPPbf0IcVaMWY0cw57/Whlk9kGFpJt8PQTvI5lEpyzZqlAgICAgICAgICAgICAgICDFk0lC0kGVgIyIxDI8xVNWJs0zlVVET84W02LtUZxTPs5FwzNfVVcr4ZZIoWgshZx/JeW8njGtbk2+0E526lqVaTw2cxM5+mbbpwV+IiY3equgJtKY43z1cwEL4y9jjiE7WuBIu12YIyuR4DtNd3S1ujLVpmrlkyp0dXP6piOboR4VjbxLj/ABf0VMaaj/jllsyfE5VpJ2mZZH1DZZYy573Qsxx4omFzixgtlyQ61t629pYfPjPtPRX/AIV6Iyjh84dN0bwscYmGSB7X4QHhxbfEMiThyzIvlzqi5peimqYiiZjvZU6NqmN9UQppfhW4QycVBIZCxwiwlpcHkWaQHZZEg58yW9L0V1as0THnP9E6OqiM4qiXN9G1WmIJoqiR00oDw6oa10GKVgcC5pByNxceHaDmtjaGGz48p6MJwd+Yy7PnHV1McKmdyf1hak6btxP6KuXVZsyvxQ0vC/hRUOp3Mo2SRzPLQx4EZwAG7iceQyy8PhFlrS9muZ1omn5/1mxq0dXTviYlGuBumNI01SBUtkfBI2xa0QYWyYRZ5w2cPe7uffuuq0jhqaZmmc/Lf92P+Hfrn/69846uheylnc3+T0rV25a8FXLqz2ZX4o5ofw74QVkzooaJr2N5RqLtiwvBLcAxOuRazjkN4Wxb0nh7lOdW7yn+s2M4G9ROdO/zhXV/wiq4WyQ1zZH2LTTkNiDWsGTm3Za+djmouaUw9unOnf5R/eRGAvVznVu+f9Nvp3hFUPLTSu4kAHGHsa7EcrZ5239a1LmmaZy1ImPnEdW3h9H0U5/G392UoPpnTWmJpCGu5EbbNtFGwcYDm9pcLu6L5efct4+xNETcqjP1UXsJXTcn4NM5ejo/APTMstI39LcRPG5zZS8Rs4zPE1zQw2thLRfLNpyW3bxNq5GdNUNK5h7lE5TT90mjkDhdpDhzg3CuiYmM4UzExOUrlKBAQEBAQEBAQEBAQEEN1k8M/wD81kRGHFM42BzOFrmBxA6A+/gtkSCCYcqfrEgBOGGQtvkSGC457F2S4l3RVdyqataIdeNJURGWUreyRD3CTPZlHn9JVbGueKPaWW07fdPJXslU++GQfwx+umxq/FHtJtO33SqNZlN3GTqj9dTse54qeZtK33Ty6nZMp+4ydUXrqNj3fFTz6G0rXdPLqr2S6bfDJ4sX5ijY13xU8+idpWu6rl1BrKpe4yeLF+Yo2Nd76efRO07XdVy6q9kql7lL4sX5iToa7308+htK13VcuqnZIpO5TeJF+Yo2Nd76efRO07XdPLq9WayKTucviR/mJsa7HbTz6I2janv/AD1Xdkek7STxGfmKNj3u+nmnaNnzUOsWk7STxGeuonQ9/wD6p2jZ81eyHSdq/wAQessdj3/+vubRsefsdkCk+P4n+5RsfEeXuy2jY759j2fUnM/xP6psbEeXubRsd8+yh4eUnx/E/wByjY2I8vdO0rHfPsDh5S7g/wAQedybFxHl+ehtKx3z7NxwW1jQQy4QQGTvbj4yzMNmu5WMuwtGVt+eEWG1drAYevD29Srk5uNv270xVS7LDK17Q9rg5rgHNcCCHNIuCCNoI3rfaC9AQEBAQEBAQEBAQEEB1xcFoqujfUue5klBDUyRWsWuu1rnNcP9NtjfLpQcA05ot1LM6B9sTMOLC4ubygHCxOZ5LmnwpBLBDlKF7ZCN561Iccec9ZQbXQWh5avHxb2t4vDfEXZ4r2tYHtStTFYyjD5a0Tv7m5hcHXiM9WYjLvbb2E1Pdo/Gk9Vau17Phnl1bWx73ijn0V9hVT3aPxn+qm17Phnl1Nj3vFHPoDgVU91j8Z/qptez4Z5dTY97xRz6HsLqe7R+M/1VG2LPdPLqnY97xRz6HsKqO6xdb/VU7Xs+GeXVGx73ijn0PYTUd0i63+qm17Phnl1Nj3vFHPop7CKjukXW/wBVNr2fDPLqbHveKOfRaeA0/dIut/qqNr2fDPLqbHveKOfRoNLaPdTymF5a5zQ03bszF94XQsXqb1EV0xuaGIsVWa5oq4sPq6grVCt8iN2W5BR27o2dCJSvgLwKk0lLxbZRExrMcri0ktBeWgNbsJNnbSNihL6T0No8U9PDTNJcKeKKJpO1wjYGAm2/JEMxAQEBAQEBAQEBAQEEf1gn3Mrv8pU/dOQfPetGPDpOcbMqY/8Aawee6mBFQVKF10Ft0E41abJ+/D+IuHpj+Hr9nd0Nwr9Pu6BTUEsjXvYzE2IXkOJoDRYneRfIHYuVRZuV0zVTG6OPB1rl+3bqimqd88OJBQSvY+VrLsjvjddow2FzkTc5cyUWbldE10xujjO4rv26K4oqnfPCN7IGg6jGyMx4TLcs5TSMItdxLSbAXHWrP8O9rxRNO+fl77lX+bZ1Kq4q3Rx4+29JqiB8MRpKNpe8W494c1paXDnJHKIG7YLdC6tdFVq18HDRnP8AKd0cfv8ASPRyaK6LtyL+JnKP4xvnh6cPrPqi0ehpzI6ERkvYAXjEzkg2tc3tvGV1yIwt6a5txTvjjG7dzydicXZiiLk1bp4cema2m0VNI90TIy50ZIeLizCCRm69toO/OyijD3a65opp3xx8k3MTaooiuqrdPDz+73ZweqiXAQk4Dhdy2ZGwO92eRHWrIwOInOIp4ecdVc4/DxETNXHynowaqmfE4xvGFzbXFwbXAIzBI2EKi5bqt1atUZS2Ldym5TrUTnDlnDk/2x/yY/shej0Z+2j1+rzWlP3M/KPo0Bcug55fI+BBQnYiXb9QFMQ2ol3Ojp2jviSqLvrasR15AQEBAQEBAQEBAQEBBGNZryNFVpG+CQeNyfOg4frqiDdLSgb46c/9MN/8UglBgskLigtugnWrPZUd+H8RcPTH8PX7O7obhX6fd2rRdADQcUJGRun5byTsaSMrX3taB4SssPYzwepFURNW+fz5MMRfyxmvNMzFO6Pz5sKte2HR7ImuBdUOxOttwnlXI3ZBgsqLuVrBRRE76p/v6ZQ2LUTdxs1zG6mP66yzpOEIipIS2zpnR4W78OHkOeei7dm894rYnHRbw1ExvqmMvbdM/nFrxgJuYmuJ/TE5+++I5+jzoKttPSNc8GZ9VIS5oks5xdsJcMxk0eFyxs3YsYaKqt81z379/wDTK9aqv4mYp3RRHHLdubLRnFQlsfGsEshMkwviLwQ6zA8nINysT2vStqxFFqYp1o1p3z2+mfdH2at/4l2Jr1Z1Y3R2ZcN+Xn9/J4aLiLZKhxdEYZZJOMBfZzAL55ZZ32G2WawsUTTXcmZjVmZz374/P7Z4iqKqLcRFWvERlu3T+evcxaasENNUyskJD3vFOC8kgE4Q8Xz985xuc7NF1TRdi1YuV01bpmdXt8s/fP0XV2pu37dFVO+IjW3cvZEJZHOJc4lxO0k3J75XEqqmqc54u5TTFMZUxlDlvDv9cf8AJj+yF6XRn7aPnP1eY0p+5n5R9EfXQc9dfJBaTsQfRGoiG2ji/tpnjwNDfOXLFk6OiBAQEBAQEBAQEBAQEEW1oj3JrP8Aku+sIOM69R7qu6aeA+V48yQS56pQ9eVzC3yQpFpxbxl8kDyoJvqy2VHfh/EXD0xxo9fs7uhuFfp90nl01StJa6eNpbfEC8XBBsQRz33LmU4O9VETFE7/ACdOrGWKZmJrjd5rpdMUzCA6aNpeA5vLHKacwR39yinC3ZzmmifZNWKs0zETXHuui0tA4XErRbHcG7S0MNn4musW2PPzqasNdp4093nx4ZFOJtVRuq7/AC4cc+5a/TFOAXGaMDk3JcB75uNvW3Mc6iMLdmcoon/W6eZOKsxGc1R/vfHIj0vTODiJoyIwHPOMWaDsJ6wEnCXYyiaJ38NxGKszEzFcbuO9kUlVHK3HG5sjdl2kEXG7oKruWqrdWrXGUrLd2m5TrUTnD2ssMmaqkcv4dfrr8r8mP7IXptGfto9fq8vpT9zPyj6NDc9qOpb7njyd4t4LKRYdyD6U1JN9youl8x+mR5lilPEBAQEBAQEBAQEBAQEEa1lNvoqtH+HlPU2/mQcV16m+kwe2pac/SkSBzxSLy0dsB4SiFCB2wPhKCc6sdlR34fxFxNMfw9fs7uhuFfp92wOj42yFxl2T1Uh9q3zM4vBfF+zkb7+YKn41c0ZRT/GmOPhnPPh29y74NFNczNX8qp4eKMsuPYxBoZmAxtqLMkbAJbwAkuiADSHYuSDhBtnvV3+TVNWtNG+Jqy39/pvU/wCLTq6sV7p1c93h9dz0rdExSGUunINQ/FLaJuxl+LY3Pk2NiSbl2EbFhbxFyiKYij9MZRv7+M+fl3ebK5hrdyapmv8AVOc7o7OEeXn3vSGkbxgnkmGLHBI8Nis0mOJ0Vhd2V74tmXTtWNVyYo+HTTuymOPfOfd6ebOm3TNfxKqt+cTw7oy7/XyeI0JGGsbxxBiibG08T+02bjg8jEbjcW9/NWzibmczqcZz49mWWXDnyVRhreURr8Iy4eeefHk3ugacNEjsfGPlkLpCGBgvhaAGtBNha2/nXPxVc1TTGWURGUdvvLo4WiKYqnPOZnOezk2i1W02OgtEuqZMIyY2xkd2o5h0nctnC4WrEV5Rw7Z/O1q4vFU4ejOePZH52OZ64YGs0rLGwYWtjpw0cw4sL1VuiminVp4Q8pcrqrq1qp3yhdvjLJgo7v3QWlB9M6lh7kQdJm+9coSnCAgICAgICAgICAgICDQ8PWX0ZXD/AAlV5InlBwfXNJirYHdtQ0h6zIUEDUi645ifCPQiAkcx6x6ESkvAvTkVKJeMDzxnF4cIB97jve5HOFzsfhK8Rq6mW7Pj6eTpaPxdGH1tfPflw9W/bX0vKlFHVgOxTOcIpA0i8crpTZ9sPJhfi2ZMPMqKcPjqYimK4yj88K6rEYCqZqmic5/PE8JNIUMR5VLUQuIAGJr4ycDTFvkHvWuLei5Cy+Dj/HH5/wCUfG0f/wAc/n/psY6+mcQ50U7P2w97n2be935SEtGZ5VrWvnZYVUY+mM4rifll0Z016PqnKaMvnn1bSPREIJc1pBfgxESyXcGNLWXOLOzSQOhc/wDz8T4uUdHQ2fhvB9eozQ8INw1wPPxsl/29+L95J45502hifH9Ohs7DeD69WtZpuhp5Hwh+Fzn+2Zudy7BvKc4k5WA8Cuqw2LxFMXKt+7dwzyU04rCYeqbdO7fv45ZpVo6hfNIImDM7TuaN7j0BaVmzVdriinj9PNvXr1Nmia6uDpei9HsgjEbNgzJ3udvcV6mxYps0RRT/ALeTxF+q9XNdX+nznrr/AL3mv2lP92FfCmUG5PSgG25EKIPpzU0Pcim6eO++kUJTVAQEBAQEBAQEBAQEBBiaXpOOgmhOfHRSRn+Npb50Hy3w20mKh1K+xa+Kigp52uBDmTQOkZIHA7M7HwoSjakevKtk3L5N0FDi3i38NkHrSPYL4gTstZ4bz87TdMjOITOl4TiOnbE2veGtiFof0aJ4DsAHFF74rH3oGK9t6ZSa0PDhJp9szWB1a6stI15aYRDhc1rmh/8Awmh3JJBsc7i97AiJiSKoS2o4R08lEIGPbI50MMbA1jnSExkuDQSczdzweYONgM1XVMUxnO5ZTGtVERvZOjIXMhjY73zGMa7O9iABa+9eUv1xXcqqjhMy9dYomi1TTVxiIZTRmBzquIznJbM5FdeOl4ji4XB1wwukDXPc5rnyktw84PfuvTREREeTzE5zMz3pnwLjjhoWStBLnNOJzyAXCPEL3JthswkXIvfdfLK3bosU1VUxxmZ+vJhcuV36qaKp4REfTn+b23pNLNed9hgvcAe/Fxax6HZfFPRfK3iIq5c/zki5hZo58vzm+e9dX98T7/a6f7sLZhpyhILu1+ipQo8neLeCyCxEvqDU+Pcek+TL99IoEyQEBAQEBAQEBAQEBAQEHzpr9AGk22Fv7NET0nHLn5AojimeDm6lC7CO2A6M/QgEDth1lSJxqyaCKi4Bzh2i/dFxNLzMamXn9nb0PETFefl90jhdMXPBiAAvh5Ldxs0NzGIEXO3eNmdtO5FiKKJpqnPt49OrdtzfmuuKqYy7OHXo9wyS+bGkXF7RtGW+xMnmVGdGW6Z956L8q8+Ee0dSpMgczi47AgXtg23zEnM22d27xberLMWJor+LVOfZx/PdXem/TXR8KmMu3h+ez0a6a9iABfbhBAGe0Y7ncqpi3l+dF0Tdz/Oq2fSkUfJklbiHvg3Mg9LRcjwqy1g7t3fRTu75/N/oqu4yzZ3V1b+6OnZ6o9pvSkLmExzswyEF4kY9s0Lh74Rk7QSSRtsSbbV36LddFEUzGcxHFwK7tFdc1ROUTOeTs+geE1BWRMZTTNYQAI4nExPAAw4Qw5nLmuO+tmqnOGrRXqy3EVCQc3PI3gyEg7Ng8Fr9JyVVNrKeM+66q9Exwj2fOuuk30xPY2synHePFNV8S1phCbfHHWVKFru/dBaiX1DqePuPSfJl++kUCZICAgICAgICAgICAgICD5z1+H3TH+Wh+1IoT2ObqUBQEE81YbKjvw/iLi6Y/h6/Z3NDcK/T7pVXPe2wDy0Wcbhgc7a0Aco2A5W0/wD3mWopnjGc+3f3OndmqOE5R7/V60JeQS83s4hmWEuAyu4X23vll6MbsUxOVPr/AEzta0xnV6f2ylUtWyOsCeYE9SmmM5iEVTlEy5BTVZGFzjczY3OJ2l5NyfDcr2cRERlDxMzMznKb6ujA6ScTtY8vja2LG0OF+UXgX32AJ6Ad11VemcoyXWYic80F01LGJ5GU59qxu4qxOy+1p3i+w9AKspzy3qqss5yd/wCCfDJ79EUsr3Y6iRj2Ek4j7U90XGv5yQwHPaT31pY7GRYpyj9U8Ov5xb2Bwc36s5/THHo4jrAcTXSEkklsZJOZJLRclNGzM4eJnvn6o0lERiJiO6Pojq3miICD6g1OH3Ipe9L969BNEBAQEBAQEBAQEBAQEBB84a+T7qHoghH2j51CexzpSgQEE71X7Kjvw/iLi6Y/h6/Z3NDcK/T7pRW1jBIGuI5IuWuDrYXXsSQ0i5LDZp22J22XOt2qpozj7dc+3fLpXLtMV5T9+mXZuh76NxYOUWuuXEFpJFi4mxvnfP8A9313tXW3bvmss62rv3/Jlqpay3aFfJR1c4BtHTVJhA2ySiJ+G3QDbw5c66ejsJ8Sr4lX6Y5z0cvSWMi3T8On9U8o6uP02hTPKDjDWRtBJ3RsGeJ7tg7209Gdu7eu024zn0jtlwcPh6r1WVPCOM9kR5sfTGkmy2p4Ltp4jlzzu2F7vMObyYWrc569f6p5eULcRep1YtWv0Rznvn7fkNZR0xke6xtxTHSHK92ssSOq/Uraq4pyz7Zya9NE1Z5dkZuiauHH9HkZe4ZM7D0NLWH6yT4VwdLU5Xony+8vQaIqzszHn9oRfh9+uv8AkxfZC6Ojf28fOfq5mk/3M/KEdW+0BBVB9P6m/wC6KbvSfeOQTVAQEBAQEBAQEBAQEBAQfNevF19KyfFZCPoNPnWPay7EAupQWQUspQkPBPhE2j4zFG6TjcFrOAthxc/yloY3BziNXKcss/s6GBxkYbWzjPPL7tjUcL6d73SOp5CXsawe2NszDjs4Dn9sO3mCoowF2mmKYrjKJz4fLo2KtI2qqpqmic5jLjHn1XaN4ZwwhwEMjsRBOcbdjWsGTGgbGhL2jrl2Ymao3fPvz7ZLOkrdqJiKZ5d2XYz4dYcOIY6eQtvyg2RoJHMCdiqp0ROca1W5bVpiMp1ad6Wx68qZrQwUEgaBhDeMjtbZay7VNMUxlHBxKqpqmaquMuV8IdLQyMbDSNlp4QXFzHuYbjLAMTc3Wzzdt5PMq4s0xXrzvn6fJdVia5txbjdHl2/Np43gCwCta730VViF7nFuMOimjIva/GNLc+jNVXrc3IiInhMT7Tmts3ItzMzHGJj3jJuuC/CdtI17DG6QPwEWcBbC3Cb357BauNwU4iYmJyybeBxsYaKomM82s4RaSFTO6cNLA4MFiQSMItuV+FsTZtRRM58VGLvxfuzXEZcGsWw1lSEBB9Oal3X0TB0GQfSKJlOEQICAgICAgICAgICAgIPl/W/Pj0tU/FcxvixsHmWLJDO+pQuGHc/yf1UiuId08h9KIVxfvPIUFC4d08hQMQ7fyH0oGP4/kPpQXY/3nkPpUiheO6eQ+lBTEO38h9KAXDt/IfSoFMQ7fyf1QMXxvIgpfpRILc91ApZB9K6kHX0VH0PkH1JBKfKUCAgICAgICAgICAgICDmnDvVKyvqXVcVT+jPlDeOaYuMa9zWhoc3ltwnC0AjO9r5Z3JRrsFTj3ukGfy7h9UiDzOo2q+HxfNP9ZEKjUXU/D4/mX+sgr2C6n4fH8w710FOwXU/D4/mX+sgvbqKn36QZ/LuP4iAdRdRu0gz+Xd+YgsOoyq+Hx/Mv9ZBYdRtZurovm5PSgsOo+u+GQH+GQeZBYNR9f8Kp+uX1UHq3UZV762Ef6bz50A6iqr4bD80/0oLRqJq/hsPzb/Sgu7BNV8Nh+af6UHm7UVWX/XICN5wSXt51Cc3ZuDGg2UNLFSRnE2Fti4ixe4klzrbrknLdsUobVAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEH//Z" // Placeholder - replace with actual image URL
      },
      {
        brand: "Microtek",
        model: "ET 648 Tall Tubular 150Ah",
        description: "Efficient and reliable Tall Tubular battery power source with a leak-proof design, ensuring consistent long backup performance.",
        features: ["Tall Tubular Construction", "150 Ah Capacity", "Leak Proof Vent Plugs", "Long Backup Capability", "Low Self-Discharge"],
        imageUrl: "https://www.microtek.in/_next/image?url=https%3A%2F%2Fcms.microtek.in%2Fupload%2Fproduct%2F2-1734045103955.jpg&w=384&q=75"
      },
      // Add V-Guard batteries if you have them
    ]
  },
  combos: {
    title: "UPS + Battery Combos",
    icon: BatteryCharging,
    items: [
      {
        brand: "Luminous",
        // icon: "https://lumprodsta.blob.core.windows.net/prodcontainer/assets/icons/LuminousLogoBlue.webp", // Remove icon if not used
        model: "Zelio+ 1100 UPS & RC 18000TT Battery",
        description: "A popular and reliable home power backup solution, pairing the smart Zelio+ UPS with the high-capacity Red Charge battery.",
        features: ["Sine Wave UPS (1100VA)", "150Ah Tall Tubular Battery", "Complete Matched Set", "Reliable Performance", "LCD Display on UPS"],
        imageUrl: "https://lumprodsta.blob.core.windows.net/prodcontainer/Images/a9611f42-5dc9-4bb8-965e-c973aae47082_Zelio1100%20with%20RC18000%20TT%20battery%20%2B%20Trolley.png"

      },
      {
        brand: "Microtek",
        model: "Super Power 1100 UPS & ET 648 Battery",
        description: "An efficient and value-for-money combo pack for essential home power needs, combining a digital UPS with a durable battery.",
        features: ["Digital UPS (1100VA)", "150Ah Tall Tubular Battery", "Cost-Effective Solution", "Easy Installation", "Overload Protection"],
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMde6Cn2ffZLuIz4vmJ95NrglIfe_Ikjo_Q&s" // Placeholder
      },
      // Add more combos (e.g., V-Guard UPS + Battery, Amaze UPS + Battery) if available
    ]
  }
};

// Define the type for a single product item for better type safety
type ProductItem = {
  brand: string;
  model: string;
  description: string;
  features: string[];
  imageUrl: string;
  // Removed logoUrl/icon from type if not consistently used in data
};

// --- The Component ---
export const ProductShowcase = () => {
  // State for the dialog
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to open the dialog
  const handleProductClick = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <> {/* Fragment for multiple top-level elements (section + dialog) */}
      <section id="products" className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Overall Section Title */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Power Products</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore reliable UPS, long-lasting batteries, and convenient combos from trusted brands.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Featuring: Luminous, Amaron, Microtek, V-Guard, LivFast, Amaze
            </p>
          </div>

          {/* Iterate over categories */}
          {Object.entries(productData).map(([categoryKey, categoryData]) => (
            <div key={categoryKey} className="mb-16 last:mb-0">
              {/* Category Title */}
              <div className="mb-8 flex items-center justify-center md:justify-start border-b pb-2 border-gray-200">
                <categoryData.icon className="h-6 w-6 md:h-7 md:w-7 mr-3 text-secondary" />
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-800">
                  {categoryData.title}
                </h3>
              </div>

              {/* Grid for products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
                {categoryData.items.map((product) => (
                  <Card
                    key={`${product.brand}-${product.model}`}
                    className="flex flex-col border border-gray-200 rounded-md hover:shadow-lg hover:border-secondary transition-all duration-300 cursor-pointer overflow-hidden group"
                    onClick={() => handleProductClick(product)}
                  >
                    {/* --- IMAGE SECTION --- */}
                    <div className="aspect-square w-full overflow-hidden bg-gray-100 p-4"> {/* Added aspect ratio and padding */}
                        <img
                          src={product.imageUrl}
                          alt={`${product.brand} ${product.model}`}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" // Ensures image fits and scales on hover
                          loading="lazy"
                          style={{ transition: 'opacity 0.3s', opacity: 1 }}
                          onError={(e: any) => { e.target.onerror = null; e.target.src = "/placeholder.svg"; }}
                        />
                    </div>

                    {/* --- INFO SECTION --- */}
                    <CardHeader className="p-4"> {/* Standard padding */}
                      <CardTitle className="text-lg md:text-xl">{product.brand}</CardTitle>
                      <CardDescription className="text-base font-medium text-gray-700">{product.model}</CardDescription>
                      {/* --- REMOVED Description from CardHeader --- */}
                    </CardHeader>

                    {/* --- REMOVED CardContent (Features List) --- */}

                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Product Detail Dialog (No changes needed here) --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          {selectedProduct && (
            <>
              <DialogHeader className="pr-10">
                <DialogTitle className="text-2xl font-bold">{selectedProduct.brand} - {selectedProduct.model}</DialogTitle>
                <DialogDescription>
                  Detailed product information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4 grid-cols-1 md:grid-cols-2 md:gap-8 items-start max-h-[70vh] overflow-y-auto pr-2">
                <div className="flex items-center justify-center bg-gray-100 p-4 rounded-md sticky top-0">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={`${selectedProduct.brand} ${selectedProduct.model}`}
                    className="max-w-full h-auto max-h-64 md:max-h-80 object-contain rounded"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-semibold mb-1 text-lg text-gray-800">Description</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-lg text-gray-800">Features</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-sm text-gray-700 pl-1">
                      {selectedProduct.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-4 sm:justify-end">
                 <DialogClose asChild>
                   <Button type="button" variant="outline">
                     Close
                   </Button>
                 </DialogClose>
              </DialogFooter>
               <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                 <X className="h-4 w-4" />
                 <span className="sr-only">Close</span>
               </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* --- End of Dialog --- */}
    </>
  );
};

// Optional: Default export if this is the only export
// export default ProductShowcase;
