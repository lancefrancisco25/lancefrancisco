function emailReciept({name, contactMethod, contactDet, service, serviceDet}) {
    // language=HTML
    return `
        <table style="border:none;border-collapse:collapse">
            <colgroup>
                <col width="390">
            </colgroup>
            <tbody>
            <tr style="height:69.1336669921875pt">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 0.5pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                    <div dir="ltr" align="center">
                        <table style="border:none;border-collapse:collapse;table-layout:fixed;width:100%">
                            <colgroup>
                                <col>
                            </colgroup>
                            <tbody>
                            <tr style="height:18.64892578125pt">
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2;text-align:center;">
                                    <span
                                            style="font-size:11pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline;white-space:pre-wrap">Name of Client</span>
                                </p></td>
                            </tr>
                            <tr >
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2;text-align:center;">
                                    <span
                                            style="font-size:15pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap">${name}</span>
                                </p></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                    <div dir="ltr" align="center">
                        <table style="border:none;border-collapse:collapse;table-layout:fixed;width:100%">
                            <colgroup>
                                <col>
                            </colgroup>
                            <tbody>
                            <tr style="height:17.89892578125pt">
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2;text-align:center;">
                                    <span
                                            style="font-size:11pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline;white-space:pre-wrap">Contact Info - ${contactMethod}</span>
                                </p></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2;text-align:center">
                                    <span
                                            style="font-size:15pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap">${contactDet}</span>
                                </p></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr style="height:65.822021484375pt">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                    <div dir="ltr" align="center">
                        <table style="border:none;border-collapse:collapse;table-layout:fixed;width:100%">
                            <colgroup>
                                <col>
                            </colgroup>
                            <tbody>
                            <tr style="height:17.89892578125pt">
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2;text-align:center;">
                                    <span
                                            style="font-size:11pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline;white-space:pre-wrap">Service</span>
                                </p></td>
                            </tr>
                            <tr style="height:26.99853515625pt">
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2;text-align:center;margin-top:0pt;margin-bottom:0pt">
                                    <span
                                            style="font-size:15pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap">${service}</span>
                                </p></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr style="height:65.822021484375pt">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                    <div dir="ltr" style="margin-left:0pt" align="center">
                        <table style="border:none;border-collapse:collapse;table-layout:fixed;width:100%">
                            <colgroup>
                                <col>
                            </colgroup>
                            <tbody>
                            <tr style="height:17.89892578125pt">
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2;text-align:center;margin-top:0pt;margin-bottom:0pt">
                                    <span
                                            style="font-size:11pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline;white-space:pre-wrap">Short Description</span>
                                </p></td>
                            </tr>
                            <tr style="height:26.99853515625pt">
                                <td style="vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden"><p dir="ltr"
                                                                                                          style="line-height:1.2">
                                    <span
                                            style="font-size:11pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap">${serviceDet}</span>
                                </p></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr style="height:10.5pt">
                <td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden">
                    <p dir="ltr" style="line-height:1.2;text-align:center;"><span
                            style="font-size:9pt;font-family:Arial,serif;color:rgb(0,0,0);background-color:transparent;vertical-align:baseline;white-space:pre-wrap">lancefrancisco@quizpy.live</span>
                    </p></td>
            </tr>
            </tbody>
        </table>
    `
}

export default emailReciept