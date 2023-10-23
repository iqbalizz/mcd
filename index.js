import fetch from "node-fetch";
import readlineSync from "readline-sync";

const getCurl = (inputEmail, deviceId) => new Promise((resolve, reject) => {
    fetch(`https://api-mgm-indo.mcdonalds.co.id/member`, {
        method: "POST",
        headers: {
            'Host': 'api-mgm-indo.mcdonalds.co.id',
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, /',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6ImJlZjMyYWMzNzUxOGQ3YzRiMjQ5YTc0MmQ3MzcxZmQwODY0MTMwMWFlMDVlM2FjN2YxYjlkYTE0OTRmZDMyZTYwYmI0NzNkOGFkNmVkZWIwIiwiaWF0IjoxNjk3OTc4ODIzLjA2MzYzMywibmJmIjoxNjk3OTc4ODIzLjA2MzYzNSwiZXhwIjoxNjk4NTgzNjIzLjA1NDU4NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.l5CwwtDepSx1ZRIp31BFcujq2sBbrdf9IgfcjQo37wmcRBTidqpR36-naoUMG76MCixA1YUyFDpPuU9fy-JXA8fnh3Qc5npnKnJoV-kHMMovU-v2CCIMsaOsbLsxw8PpZ9ZocI8ex6Y9QvV2sWzzXZRn9DIZJHS02G1wKeFfiHnZYrsYjygGLwaSJyr_wkvKQVUw6z8QUSIGhIpCGlhBDdUYN0ekeKUQTOFPc2-Osv5_y5fyt8lDjMMqv_VWJ_HV4rNI_GHTtNVMo3TmaktZIQ942yO1dwRM4HEWuj_NtbB13Hk3UffhpZwsPwooQxEXt5-jFdWbKvuXX7ccmmbGlcgjLTPfT7bwh4I9BL5zyeazUukA0UxTDOq3pVWDz2zkQDOahj0OJtfYv6Y04ZwDlh8d9RaH_BYjWy4OqDpTXXcLsd9ZICP1MHVTP11MrLwJCBrywvE4kMzCEHI9oPWtjc71JadNh_oNNsIOys27g5BH1utoUbb9ak36-5kgI3GYaLzoZoYkWlQ65srxtHI6tUNKLTp0Ij4FtxjVTAJ8q_9GmL-H9-N5s9oODCBIOXMSUBaS9GpselVb5RPWPaLeLCtncNeNW3PZIm7PceGuykkytsdn1pg5pctUb8m-pLTzO8-oXDxBE7ykBAvHOReUClelEv_p4u7SnbC0VUOG9yY',
            'Sec-Fetch-Site': 'same-site',
            'Accept-Language': 'id-ID,id;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Sec-Fetch-Mode': 'cors',
            'Origin': 'https://mgm.mcdonalds.co.id',
            'Content-Length': '97',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
            'Referer': 'https://mgm.mcdonalds.co.id/',
            'Sec-Fetch-Dest': 'empty'
        },
        body: JSON.stringify({
            "email": inputEmail,
            "device_id": deviceId,
            "username": "Nuggets"
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});

function generateShortDeviceId() {
    const uniquePart1 = generateRandomChars(8);
    const uniquePart2 = generateRandomChars(4);
    const uniquePart3 = generateRandomChars(4);
    const uniquePart4 = generateRandomChars(4);
    const uniquePart5 = generateRandomChars(12);

    const deviceId = `${uniquePart1}-${uniquePart2}-${uniquePart3}-${uniquePart4}-${uniquePart5}`;
    return deviceId;
}

function generateRandomChars(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

(async () => {
    const deviceId = generateShortDeviceId();
    const inputEmail = readlineSync.question(`[?] Masukkan Email Kamu : `)

    const resultCurl = await getCurl(inputEmail, deviceId)
    // console.log(resultCurl)

    if (resultCurl.meta.status === '200') {
        console.log(`[!] Status : Berhasil`)
    } else {
        console.log(`[!] Status : Tidak berhasil Curl`)
    }
})();