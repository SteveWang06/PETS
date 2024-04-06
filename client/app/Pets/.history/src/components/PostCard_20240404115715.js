import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PostCard = ({
  authorName,
  authorAvatar,
  caption,
  postImages,
  postKinds,
  like,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: authorAvatar }} style={styles.avatar} />

        <View>
          <Text style={styles.author}>{authorName}</Text>
          {/* <Text style={styles.time}>{time}</Text> */}
        </View>
      </View>
      <Text style={styles.content}>{caption}</Text>
      <Text style={styles.content}>{postKinds}</Text>
      <Image source={{ url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQEBAVFRUPFRUVFRAQEBUQFQ8QFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGBAQFy0lICUtLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAABAgAFBgQDB//EAD0QAAEDAgQDBgMGBQMFAQAAAAEAAhEDIQQFEjFBUWEGEyJxgaEykcEUI0JSsdEHYuHw8TNyoiRTY5LSFv/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAjEQEBAAMAAgMAAwADAAAAAAAAAQIDERIhBDFBEyIyUWGh/9oADAMBAAIRAxEAPwC9CcIBOFi+iFoTgJQE4CAICYBQBMAmQgJgFAEwCEiEQFAEwVEgCMKQigIAjCkJggghFRFASFIRRhABFSEUAIURUQCqQmQQAQhMgmZYQTpSgyFKQvQpCgdIUpCcpShRVFFEBXgJwgEwWZmanAQanCZIE4QCYISYBMEAmCZCEQoEQmQwoiEUAEQoogCigE0ICIqBEIIFEVEBFFFEGiCKiABQKKiYKgUVEGUpSmKUoBSkKcpSgyIoqINXhMAlavQLMzBOEoThMqYIhQJgghCZAJgqIQiFAigkRQCKAgRhRRMCiEEwSJEVFEAVEFEAUEVEAFEUEAEEyVMwKiJSlAApSmJSlBlKUpilKDKopCKA4QmCVqdqhR2pwlamCEmTBKE4TIwRCATBMhCKATAICKIwggCigEQmBC88RiG0263mAOPVeqpe1X+mwcNd/RpWezLxxtCywmPpVfgeCfymx+RXUsrhKTW32IuHcleZdjdZNN3xtvP528D5rLVu8vWSZZbx3KKKBdBoooqfHZkXl1OkYDLPqD835W9eZUZ5zGdoWrqzAdJc0E7AuAJ9Ey+e5lSDX2O5udzPmt9QdLGk8Wt/RZ6t3nbOHw6BUJSkrcCUsqSlKYEpSoSlJQaFKVCUpKDSVEhKiD45gnCQJwoM7V6BI1OEJMEwShMEyMEwQARe4NBcdgJJ6JkZJ9qpiBrbfa+6zOZZoahIaYaNoPuqiq50X4Tf5fuhz5fIkvI+gU6rXfC4HyIKeF8tpZjXY/VSJBvA3t1+a2nZjP8A7UC14h7P+XNCsN2OXpeoqKBDYQq3tJS1Ycu/7ZDvMbH2JVkEuJo66bmfmaR8wpzncbAxQx3c6XOPh5kfhK9H4pprB7HEBuxad5+ircY8OIpkE6CRodwcJBHUbpKmKZSbrdMNsG0xLnONg0Db3Xn97JjGfOW2trhc0e8ACnJ5l0T7K2xFGrTYHOa2/wCHVceyyvY7M6eIEt3lpDXRqAIBEwTaDMgrY9p6wa1pe4NbBv8AzLrwuXje/jnz25eUkZ7NMXWcyKcMNwTMn0PBU1HECnSiLgwZ4uXZlua0cTq7t4c5nxAtdTdAMag1wEtkESJC8c+wzS3VsRy581zZZXy7m2l8lTWpuq1WNHExP8xt9V9AAAEDhZY/s0zXVaRcMkz6ESeRkrXkrf40+8m35xCkKJQJXUAQUKUpBClKJKUlBgUpUKUlHTCVEsoo6p4tThICnapKvQBOEjU4QRgnCUJwgjBVfafEaMP/ALnBu8W3+isK9bQJ+QWS7Q5gajmU3RDnAAfzEwLnqnay25cxqv71rILib3gbAc1YYlrXslt2kSS38vOf72XRmPZClWpg1qrgGwXaQ1oIHAyDbp0XXltHAFvdUXg6BoBDtTgCOJP1T48zrMtptLS5pBbzn0ggjomy+uKNQObIvaBu7yXaOx/2dz308RUh5ktc1kbje17CPUrzpUPvmMIkNaS7jdxgfp7pjy5fTXZfmPeQCLqxWbdh+7gt9FdZfidbbi4Sehp2+U5XWEXOgE8kFU9o8Z3dKB+KynLLktbsthKGutUqx8byb/hBkr2zHKWVmFmm54tsRz/ZDD1gGwDxVpgnsD2hzhDiAJPxOIMD2XBh7rLZ33R7I5bh8vb3lRzWmoYBe8Cw3iepWuznCU8fhPu3Nd+JrmmQY3E+S+SfxSy6u6tTxFPxMazQ5ouWwSQQORnhyW2/hBga1DD1HV3f67g5tOA3SACJ0gwCfoF6OMnOPPzl75PDJOybcO5x1OHIREySXb85+fBW2bZaw0ovBsTM6TwVxnmLY0gT4gJIEE6ZAmPMqsfir6d9QuFybcOW9dGvK2SxS9k6XdtqMPxap82xAV/Kr8G0Neeq7ZWvx/8AEjs732JKUlRKVsYylJUSkoCFAqEpSUjAlISiSkckaKJFEAoTtKRqdqFV6tKdebUXH06/REY7bzC0ftDBYuFkzcVT4PafJwK86GXBwa6wBEgRaOvzXNmWBLYdT023kkW6WhVY5Mfl5fVjmzDH+ItOwbIMlYbPMVUFSnVa3UKb2PDR+INcDC0lfFRV1GHNB0Ob/K9p2M9AZXHicu0QCJDrsd+ZvD/Cjp5S5TqxzrMaVfDOaHwx7CPATIJEXHAys32KxVKgXisakh4b3jqb2sbcNbd1gSSEaeTaXd5vZ3gdsWk3BVzisOxzWOrGs8ODXtpP0NYHNLgC4gS4gjjyBTlR4TnuNRj8fSZT1vqNAA4nfyCy2UVX1ia2mBVqagP/ABhpa31ge6p+0DXOLbS1t/DGw58ZVzlONY+i1lOQBEHi0i9+SOoupoziG3a7eBY9bSOYTZJUBeQOUxwVTWxegaoJJGmAC4m/L191ddnsI9jC6o2C+IB3a3kU/tpowsyWyy/bF92NPFalfOe0mad5iXEfDT8I6xuVjvvMOO+GoYZ7h4Qrqlkbn0nNe6CQNLhc03i7XCeRgqtybFwQ2fi6fVayk+yx1Yy+3NtzynphswybF4lpD8S9hp6mkNPxEXBneIj+qs8nOJwjNH2pzy52kS1ptFyLbyRvzWoOANQmLEjzB6rrynKmUySfE5pIk8Ntvl7Lrl9M7njzv/hMHlDu5e4uJqPaBJJJsZuTuSRcrhflWI3LSOuqdlq2uhCrVgGdks9Uy+2E3ZSsXhy4VPGTO0K1VLiq84i3F3/FXMrH4/1Z/wBvRx+hlKSogV0VQEoEqFISkEJSlyhKQlBoSkLlCV5koM0qLzlRBvQL0C82pwg3oFV5k+t3lPunDTq+8DojRYcbz1+as2rnzLDh9J7dIcXiwJi/A+hQ59+NuPp4doqONNNjcE+CGuBcNHxADu/i/D8UxeY4SrrB4Z3cAVjqfHiMC3SwA9kcorMLAwsLNAADQLNjgItC6xWg7SDzhU87xv6y2bZcGghjQNW9vkvPKcaBGHrAFrrNJ4E8Fo8fR18P6LN5zgiBbheRwU8ba9njV1hcoosMhpPLWdQHlK4+0TfHTgbNI9CbL1yHNRXZpJ8bLOHOOIXjmzi6oelv3903RtsmHpn8TggbdPaBK4MLlAkjqTYx+ivKkGXWkRtE7/0XtgGgw7ieAunxxXOqqrl3dnU1xBBHEzPNa/IczFenf42WcOfJ3quH7MDJPl6LP4l9TDVe9p203jg5o3afMfoi+mujZZeVv6vwny818szGgXVH2A8R2EL6bgMW2vSbVZtUaD5cweoNlgcZTitUAH43fquT5X1HoRUYSo5hjhz4jyW3yTHa7He3y5rG1GEO4j9lZZM15eA3/AXNrzuNLbhMsX0fDA8OH6L30mSdiufACGiTJgX58F307jbbdelI8rKvJr3Sq/N8x0N0g3P6Gf2VnjGuDSW7gW81g8W9znku57LHfs/jnP8Alto1+d6OFZJLz6dAtEFR0dtOxKuws/i/Vd0RKSiUpXUZSUpKhSFAQlISi7nzStYXbDZAtknSkrzJULkhKSklRJKiD66wnCQJ2pmdqdIEyE0mk7hd2Fc7Y/Nc1Ez6Kyw7QN05HnZ38r2ZTVdmuGGgmFbSAqzO64FM+Sv8c/6+b4XEOp4kFljr+Y4ha0Onfc+lysQx04hnV449VuaQBBnl9FGLfZl6kcYjVzneOn9+yNXwGRby6pGVR4mncExF7FV5xji7TGx57xzRU48aKm+2/wDlceYtsSR7r0otMg8DyTYkA2+idZ/VcPZDGClWdhTtVBewcnN+ID0v6LhzNunEVP8Ae73v9Vy589+HNLE07Po1LWkQ8FpB6XC5clzF9d73VCC4uk7C/kFzb52cehrz7j1ocHlLa4B/vyVvl+VU6Zt8+SOVu0gFvwnh+U8Vb0WCPMjZPXqxjDZsyv69qYtvfgu3Du4cF50A2J/VdNMgiQuiRy2vHMKD3thjoKy2YZd3RBcZcbnkFthCzuZ4Z1atAmG72+qw+Rr7O/rbRnZefilwrJdKs0K2HbTdpHD9UZS0YXGV24ZeXsCkKYlI5y3aFK5sTXDBJ+SGKxUCG3P6Ksx7ToJuSeKm3jLPZJ6i4yp4dTcXCQ3ns4XuFa06ciabYafIz6fuqjJMLTIEPIlukjmZJklaHDvDPDqmOavG+nBtvapcbllRsuAmTMRBE8uarHFaPG52xmIZhXNeXVACCGeDS46QdRPMgWVLnAAqQBBi88bkA+yMpHV8bdll/XJxyovPUipdiwBTtK8GlOChb3BR1LyaUSUJpWYmH6ee3mrDD4m91Q1bmeV1Y0/Yo68/LltWzqw3BVB2lxv3ZEj5wuiqTFjcyFQ9oGltNxPLZK5JmM6y2CfqxdOLy/h0BK31QiN9189yl2nE0yG31GbcwQvojCOJtCeKdqozIECW/FcjqeSz+ExmquGmA48HH2PVbHE05P6LM4/LGHE06rgTBiBGnpKqxlK02Fc4xefKIAVgWSNtunFc2DmABHmBFhwC7qTpE87pp6ynbSl/0z5/DDvLSQfosB2RxZFffffYr6P24YDhKoM3Y64GqLcl8x7M0TGsbg8BKy2T1106r+PqOCxhpm1wbkfsr/L8ya8eE7cDwKxuDcSxpdeysMof94W8x+krn17L3jfPCc623fiN5le7sTAgKqwoK6nAk9LLqlc1xjr+1wLnkuN+ZnVDIA4nmufHO0gcydlwMpvdAAMn9Fns2WeoeOEvt0PxIc8jiN1C5cgjv3wvatWDWlxMAblVrvp2a5JjBxGIDGlzjAC4alVz4AJGrgNwFx1KnfGXbH4Ry6+assNQl08k/LrHbsv1HscHAHRCtQBCuO71MC5DS4Isc+NV2VtLSYsrunRBuTfkFwtow6VYvexrdQKMV2debWmpA0zoJg2lo2JHVVHaLDOY8F1TXq1RaNLQQQDz+IienoPV2ZikfCT5cLqoxeNdUcS75flHRV64206rM/L8eOpBJCKl2rEOThy4w9OKifTdgciHLkFRMKiOlUqC/QrqwzwWRxaqyvjqYcWFwDmt1kHcNmJ8rL2wlU92XgeEjV6c0nnbeS3jpwlYPq6Pygk+37qo7W1mhpEgfVevZxxOIr1ObWtb5mT9AqPtu57QXmQAYPQ9fRL8R3+0iiw9TRUa6fxDflK+iYfh9eML4xis1LSIPEEL63lOKD6bXyPE0Gx5jaU4e339LGrHxTYx6X/v5qoxrQXsBjeZm1r8F11a1rcj7zb2CpDj2uxLWTABJvad/wBwqtYSNRQMNkXgcV2MPBV1N8iQbmOsXj9120X2HqPUcE+lxVdrYGFqzF2OueZEbL5x2IwxFYOmBtHArYfxOxrWYdtOb1XbfytufePmsb/DnA1MRmDQxp00wXVHbNY3YT1JsAlfa8b4vr9DKab23EeVvZV2ObSw1ekwGHP1mNyQG7n1IW6oYRrGxG3FfNP4oNbQxuHq8X03COrHD/7WeWEnuRerZcrytbgal12NeJ87eqxGX9o2wL7CPe66M1z7TSHdkS477xb/ACn3kVcb1rsDWpVqrm2IaS31Bgx6rszQMw9F7wA21ieJPVZT+Hbmhl7uLnE8bkytxmNFtei+k7Z4In8p4H0KrD3O/rLZ/XLn4wWVkmXfm4ri7UYrSwM53PkP6rrzzvcGwsYzU8AaeAcJgkTyv8liquKe933xOo7yQVl/nHj0p/n01mXOD2NE3tCv8CwtOl2/D+YLO5FT1GGnrJ4Lc0KDXU9D9yLO5HgeirGenBsvMnk14FuaaB59VR4LHl9ibtPvP+V1HHhm52TmQuC5p4dpvCGKwrdK8MHjXPbLYBN4iZC9Z1Xc4zuAYAjotJxn2yspndEtcDwcFWErV51Ra+nbdpCz5wqVj0fjZ9w9uJRdn2VRLjo7HqKSYUl6gJgEcR15Ckj3K9wEQjhdcFbKaLzqdTBJESWgmOV+CZ+WEt0is9oAjS3REcrt8x6rvC9AjjPLGX7VGWZN9n+Cq4y7Ue8AdJiOEcl45tkDsTapXdpJu0MbBtHGVfKJ8jPwx73jHHsFh+AB/wBw/ZdlLs9VpMDKTmgN2BJgey0wTBHiqyMj/wDn8Q5sVNJcGxr1k+MkGeFrR6qixHYTHGoXMrU2t1SwF73FoG19K+mwoE+MpqkvWLy7IMbTH3ha5xjxtqFos4Hby3/ra9w+ExDTGppbeC4nUJNrdBHHmrkBGEcH8c71jc77FNxb+8q1nzwE+Fo5NbwXv2X7M1Mv1ihWBFV9NztTYJDDOmZNrrVEKAI4dxl/HVTzCtBmL9TYfK9lnu03Z9mYVW1a73TTbpa1hgAEyT5m3yV0EYS4MdeON7Iy9DsVhm7F/q/9l7O7IYaI8f8A7n6rRgI6UvGL6p8uyQUJ7qo8auBh23or1mJqj8e4E+DcxE7ryATQnJIm4y/ceGPb3saxMbSNv7hVWI7P4epd1MTzV3CBCLjKvH1ORUYPJWUidDiJtG6uhXcLzwIPWV5woUTGROWEv3FVTydjXFzXPBdMmRxvyXlism1gjvqgnj4beyuIUKPCKcOX4V9Kxfq2jw6TbjvurHEVi8AHhy9f3XnCKcnE/wAePfp4GmPmvM0gukhKQm2xkn05+5UXvCiFOEBMAiooIQEYUUTBgE4CiiTOiApCiicIwCZoUUTBoUhRRMjgIkKKIAQoAoogGATQoogJCYBFRIJCCKiAChCKiaiIQiogBCEKKIIYQhRRBwsIOCiif4uPMqKKJG//2Q=="}} style={styles.postImage} />
      
      <View style={styles.likeIconAndLikeQuantity}>
        <MaterialCommunityIcons name='thumb-up' size={15} color={"#099BFA"} />
        <Text style={styles.likeQuantity}>{like}</Text>
      </View>

      <View style={styles.line}></View>

      <View style={styles.action}>
        <View style={styles.like}>
          <MaterialCommunityIcons name='thumb-up' size={24} />
        </View>
        <View style={styles.comment}>
          <MaterialCommunityIcons name='comment' size={24} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontWeight: "bold",
  },
  time: {
    color: "#666",
  },
  content: {
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },

  action: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  like: {
    width: "40%",
    //borderWidth: 1,
    alignItems: "center",
    //borderRadius: 10
  },
  comment: {
    width: "40%",
    //borderWidth: 1,
    alignItems: "center",
    //borderRadius: 10
  },

  line: {
    borderWidth: 0.5,
    marginBottom: 10,
  },

  likeIconAndLikeQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    width: 30,
    height: 30,
  },
  likeQuantity: {
    marginLeft: 5,
  },
});



export default PostCard;
