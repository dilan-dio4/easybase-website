/* eslint-disable no-fallthrough */

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { HelpButtonWithText } from './common/utils';

export const useStyles = makeStyles(theme => ({
    tabsBorder: {
        borderBottom: '1px solid #e8e8e8',
    },
    refractorRoot: {
        padding: '5px 15px'
    },
    codeRoot: {
        backgroundColor: '#272822',
        padding: 15,
        width: '100%',
        borderRadius: '0.3em',
    },
    clearButtonRoot: {
        color: lighten('#757575', 0.55),
        borderRadius: 4,
        display: 'flex',
        cursor: 'pointer',
        marginRight: 8,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: '#ffffff'
        }
    },
    singleComponent: {
        padding: theme.spacing(1, 0),
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    columnHeaderTypography: {
        wordBreak: 'break-all',
        fontWeight: 500,
        fontSize: 18
    },
    optionsPaper: {
        borderRadius: 6,
        position: 'relative',
        width: 375,
    },
    helpIcon: {
        position: "absolute",
        top: 12,
        right: 12,
    }
}));

export const generateBareUrl = (redisID, route) => `https://api.easybase.io/${route}/${redisID}`;

const isMapNotAllNulls = (typeToValueMap) => Object.values(typeToValueMap).some(val => val !== null);

const _python_option = (param_string, typeToValueMap) => {
    if (param_string in typeToValueMap) {
        let val = typeToValueMap[param_string];
        if (typeof val === "boolean") val = val ? "True" : "False";
        return `, ${param_string}=${param_string === "authentication" ? `"${val}"`: val}`
    }
    else return '';
}

export const generatePostBody = (map, keyValConnector, joiner, escapeQuotes = false, isPython = false) => {

    const convertValue = (val) => {
        switch (typeof val) {
            case "string":
                return `"${val}"`;
            case "boolean":
                if (isPython) return upperFirst("" + val);
                else return ""+val;
            case "object":
                return isMapNotAllNulls(val) ? generatePostBody(val, keyValConnector, ', "', escapeQuotes, isPython) : '{}';
            default:
                return val;
        }
    }

    if (isEmpty(map)) return "";
    const params = [];
    Object.entries(map).forEach(([key, value]) => {
        if (value !== null) params.push(`"${key}"${keyValConnector}${convertValue(value)}`);
    })

    if (escapeQuotes)
        return params.map(ele => ele.replace(/"/g, '\\"').replace(/'/g, "\\'")).join(joiner);
    else
        return params.join(joiner);
}

export const generateTABLELanguageContent = (redisID, typeToValueMap) => {

    const _html_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        return (
            <>
                <code className={`language-html`}>
                    {`
                    <html>
                    <head>
                        Paste this into the <head> of your html:
                        <script src="https://cdn.jsdelivr.net/gh/easybase/easybasejs-visual/dist/bundle.js"></script>
                    </head>
                    <body>
                        ...
                        <table id="easybase_table"></table>
                        ...
                    </body>
                    <script>
                    `}
                </code>
                <br />
                <br />
                <code className="language-javascript">
                    {`
                    ${isMapNotAllNulls(fixedTypeToValueMap) ? `
                    const customQuery = {
                        ${generatePostBody(fixedTypeToValueMap, " : ", ",\n            ")}
                    }` : ''}

                    // To customize table,
                    // set fourth parameter to object with options from https://datatables.net/reference/option/. 
                    EasyBase.table("${redisID}", "easybase_table"${typeToValueMap.authentication ? `, "${typeToValueMap.authentication}", null` : ""}${isMapNotAllNulls(fixedTypeToValueMap) ? typeToValueMap.authentication ? ", customQuery" : ", null, null, customQuery" : ""});
                    `}
                </code>
                <br />
                <br />
                <code className="language-html">
                    {`
                    </script>
                    </html>
                    `}
                </code>
            </>
        );
    }

    return [
        {
            language_name: "HTML",
            code_string: _html_code_gen(),
            prism_code: 'markup',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        }
    ]
}

export const generateCUSTOMLanguageContent = (redisID, typeToValueMap) => {
    const _javascript_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        return (
            <>
                <code className={`language-html`}>
                    {`
                    <html>
                    <head>
                        Paste this into the <head> of your html:
                        <script src="https://cdn.jsdelivr.net/gh/easybase/easybasejs-visual@1.0.3/dist/bundle.js"></script>
                    </head>
                    <body>
                        ...
                        <table id="easybase_table"></table>
                        ...
                    </body>
                    <script>
                    `}
                </code>
                <br />
                <br />
                <code className="language-javascript">
                    {`
                    // To customize custom components,
                    // set fourth parameter to object with options from https://glidejs.com/docs/options/. 
                    EasyBase.custom("${redisID}", "easybase_table"${typeToValueMap.authentication ? `, "${typeToValueMap.authentication}", null` : ""}, null);
                    `}
                </code>
                <br />
                <br />
                <code className="language-html">
                    {`
                    </script>
                    </html>
                    `}
                </code>
            </>
        );
    }

    return [
        {
            language_name: "HTML/JS",
            code_string: _javascript_code_gen(),
            prism_code: 'javascript'
        }
    ];
}

export const generatePOSTLanguageContent = (redisID, typeToValueMap) => {

    const _javascript_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        delete fixedTypeToValueMap.insertAtEnd;
        return (
            <>
                <code className={`language-html`}>
                    {`
                    <html>
                    <head>
                        Paste this into the <head> of your html:
                        <script src="https://cdn.jsdelivr.net/npm/easybasejs/dist/bundle.js"></script>
                    </head>
                    <body>
                        ...
                    </body>
                    <script>
                    `}
                </code>
                <br />
                <br />
                <code className="language-javascript">
                    {`
                    const newRecord = {
                        ${generatePostBody(fixedTypeToValueMap, " : ", ",\n                        ")}
                    };

                    EasyBase.post("${redisID}", newRecord${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}, ${!!typeToValueMap.insertAtEnd}` : `, null, ${!!typeToValueMap.insertAtEnd}`})
                        .then(data => {
                            console.log(data);
                        });
                    `}
                </code>
                <br />
                <br />
                <code className="language-html">
                    {`
                    </script>
                    </html>
                    `}
                </code>
            </>
        );
    }

    const _node_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        delete fixedTypeToValueMap.insertAtEnd;

        return `
        // npm install --save easybasejs

        var EasyBase = require('easybasejs');

        const newRecord = {
            ${generatePostBody(fixedTypeToValueMap, " : ", ",\n            ")}
        };

        EasyBase.post("${redisID}", newRecord${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}, ${!!typeToValueMap.insertAtEnd}` : `, null, ${!!typeToValueMap.insertAtEnd}`})
            .then(data => {
                console.log(data);
            });
        `
    }

    const _python_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        delete fixedTypeToValueMap.insertAtEnd;

        return `
        # pip install easybase-python
        
        from easybase-python import get, post, update, delete

        newRecord = {
            ${generatePostBody(fixedTypeToValueMap, " : ", ",\n            ", false, true)}
        };

        res = post("${redisID}", newRecord${_python_option('authentication', typeToValueMap)}${_python_option('insertAtEnd', typeToValueMap)})
        # Successfully inserted new record
        `;
    }

    const _java_code_gen = () => {
        return `
        import java.net.*;
        import java.io.*;

        public class HelloWorld{

            public static String easybase(String easybase_url, String postBody) throws Exception {
                URL url = new URL(easybase_url);
                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setRequestMethod("POST");
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Accept", "application/json");
                con.setDoOutput(true);
                con.setDoInput(true);

                OutputStream os = con.getOutputStream();
                byte[] input = postBody.getBytes("utf-8");
                os.write(input, 0, input.length);           

                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return response.toString();
            }

            public static void main(String[] args) {
                String easybase_url = "${generateBareUrl(redisID, 'post')}";

                String postBody = "{"
                    + "${generatePostBody(typeToValueMap, " : ", ',"\n                    + "', true)}"
                + "}";

                try {
                    easybase(easybase_url, postBody);
                } catch (Exception e) {
                    System.out.println(e);                    
                }
            }
        }`;

    }

    const _c_sharp_code_gen = () => {
        return `
            using System;
            using System.Net;
            using System.Text;
            using System.IO;

            public class Program
            {	
                static void easybase(string easybase_url, string postBody)
                {
                    var request = (HttpWebRequest) WebRequest.Create(easybase_url);
                    request.Method = "POST";
                    request.ContentType = "application/json";

                    using (var stream = request.GetRequestStream())
                    {
                        stream.Write(Encoding.ASCII.GetBytes(postBody));
                    }

                    var response = (HttpWebResponse) request.GetResponse();
                    var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
                }
                
                public static void Main()
                {

                    ${isMapNotAllNulls(typeToValueMap) ?
                `string postBody = "{"
                        + "${generatePostBody(typeToValueMap, " : ", ',"\n                        + "', true)},"
                        + "\\"updateValues\\" : " + updateValues
                    + "}";
                    ` : ''}
                    string url = "${generateBareUrl(redisID, 'post')}";
                    easybase(url, postBody);
                }

            }
        `;
    }

    const _swift_code_gen = () => {
        return `
        import UIKit

        func easybase(easybase_url: String, postBody: [String: Any] = [:], completion: @escaping ([EasyBaseEntry])->())
        {
            let url = URL(string: easybase_url)!
            var request = URLRequest(url: url)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpMethod = "POST"

            let jsonData = try? JSONSerialization.data(withJSONObject: postBody)
            request.httpBody = jsonData
            
            let task = URLSession.shared.dataTask(with: request) { data, response, error in
                guard let data = data, error == nil else {
                    print(error?.localizedDescription ?? "No data")
                    completion([])
                    return
                }
                completion(data)
                }
            }

            task.resume()
        }

        let url = "${generateBareUrl(redisID, 'post')}"

        ${isMapNotAllNulls(typeToValueMap) ? `
        let postBody: [String: Any] = [
            ${generatePostBody(typeToValueMap, " : ", ',\n            ')},
            "updateValues": updateValues
        ]
        ` : ""}
        easybase(easybase_url: url, postBody: postBody) { (easybase_data) -> () in
            print(easybase_data)
        }
        `;
    }



    return [
        {
            language_name: "HTML/JS",
            code_string: _javascript_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: "Node.js",
            code_string: _node_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: 'Python',
            code_string: _python_code_gen(),
            prism_code: 'python',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybase-python" title="Read the Documentation" />
        },
        {
            language_name: 'Java',
            code_string: _java_code_gen(),
            prism_code: 'java'
        },
        {
            language_name: 'C#',
            code_string: _c_sharp_code_gen(),
            prism_code: 'csharp'
        },
        {
            language_name: 'Swift',
            code_string: _swift_code_gen(),
            prism_code: 'swift'
        }
    ];
}

export const generateUPDATELanguageContent = (redisID, typeToValueMap) => {

    const _javascript_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        delete fixedTypeToValueMap.updateValues;
        return (
            <>
                <code className={`language-html`}>
                    {`
                    <html>
                    <head>
                        Paste this into the <head> of your html:
                        <script src="https://cdn.jsdelivr.net/npm/easybasejs/dist/bundle.js"></script>
                    </head>
                    <body>
                        ...
                    </body>
                    <script>
                    `}
                </code>
                <br />
                <br />
                <code className="language-javascript">
                    {`
                    ${isMapNotAllNulls(fixedTypeToValueMap) ? `
                    const customQuery = {
                        ${generatePostBody(fixedTypeToValueMap, " : ", ",\n                        ")}
                    };
                    ` : ''}
                    const updateValues = {
                        ${'updateValues' in typeToValueMap ? generatePostBody(typeToValueMap.updateValues, " : ", ",\n                        ") : ''}
                    };

                    EasyBase.update("${redisID}", updateValues${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}` : ''}${isMapNotAllNulls(fixedTypeToValueMap) ? typeToValueMap.authentication ? ", customQuery" : ', null, customQuery' : ''})
                        .then(data => {
                            console.log(data);
                        });
                    `}
                </code>
                <br />
                <br />
                <code className="language-html">
                    {`
                    </script>
                    </html>
                    `}
                </code>
            </>
        );
    }

    const _node_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        delete fixedTypeToValueMap.updateValues;

        return `
        // npm install --save easybasejs

        var EasyBase = require('easybasejs');
        ${isMapNotAllNulls(fixedTypeToValueMap) ? `
        const customQuery = {
            ${generatePostBody(fixedTypeToValueMap, " : ", ",\n            ")}
        };
        ` : ''}
        const updateValues = {
            ${'updateValues' in typeToValueMap ? generatePostBody(typeToValueMap.updateValues, " : ", ",\n            ") : ''}
        };

        EasyBase.update("${redisID}", updateValues${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}` : ''}${isMapNotAllNulls(fixedTypeToValueMap) ? typeToValueMap.authentication ? ", customQuery" : ', null, customQuery' : ''})
            .then(data => {
                console.log(data);
            });
        `
    }

    const _python_code_gen = () => {
        const pythonCustomQueryMap = { ...typeToValueMap };
        delete pythonCustomQueryMap.authentication;
        delete pythonCustomQueryMap.updateValues;

        return `
        # pip install easybase-python
        
        from easybase-python import get, post, update, delete
        ${isMapNotAllNulls(pythonCustomQueryMap) ? `
        query = {
            ${generatePostBody(pythonCustomQueryMap, " : ", ",\n            ", false, true)}
        }
        ` : ''}
        updateValues = {
            ${'updateValues' in typeToValueMap ? generatePostBody(typeToValueMap.updateValues, " : ", ",\n            ", false, true) : ''}
        };

        res = update("${redisID}", updateValues${_python_option('authentication', typeToValueMap)}${isMapNotAllNulls(pythonCustomQueryMap) ? ', customQuery=query' : ''})})
        # Successfully deleted records
        `;
    }

    const _java_code_gen = () => {

        const updateValues = 'updateValues' in typeToValueMap ? typeToValueMap.updateValues : {};
        const fixedTypeToValueMap =  {...typeToValueMap };
        delete fixedTypeToValueMap.updateValues;

        return `
        import java.net.*;
        import java.io.*;

        public class HelloWorld{

            public static String easybase(String easybase_url, String postBody) throws Exception {
                URL url = new URL(easybase_url);
                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setRequestMethod("POST");
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Accept", "application/json");
                con.setDoOutput(true);
                con.setDoInput(true);

                OutputStream os = con.getOutputStream();
                byte[] input = postBody.getBytes("utf-8");
                os.write(input, 0, input.length);           

                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return response.toString();
            }

            public static void main(String[] args) {
                String easybase_url = "${generateBareUrl(redisID, 'update')}";

                String updateValues = "{"
                    + "${generatePostBody(updateValues, " : ", ',"\n                    + "', true)}"
                + "}";
                ${isMapNotAllNulls(typeToValueMap) ? `
                String postBody = "{"
                    + "${generatePostBody(fixedTypeToValueMap, " : ", ',"\n                    + "', true)},"
                    + "\\"updateValues\\" : " + updateValues
                + "}";
                ` : ''}      
                try {
                    easybase(easybase_url, ${isMapNotAllNulls(typeToValueMap) ? `postBody` : `""`});
                } catch (Exception e) {
                    System.out.println(e);                    
                }
            }
        }`;

    }

    const _c_sharp_code_gen = () => {
        const updateValues = 'updateValues' in typeToValueMap ? typeToValueMap.updateValues : {};
        const fixedTypeToValueMap =  {...typeToValueMap };
        delete fixedTypeToValueMap.updateValues;

        return `
            using System;
            using System.Net;
            using System.Text;
            using System.IO;

            public class Program
            {	
                static void easybase(string easybase_url, string postBody)
                {
                    var request = (HttpWebRequest) WebRequest.Create(easybase_url);
                    request.Method = "POST";
                    request.ContentType = "application/json";

                    using (var stream = request.GetRequestStream())
                    {
                        stream.Write(Encoding.ASCII.GetBytes(postBody));
                    }

                    var response = (HttpWebResponse) request.GetResponse();
                    var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
                }
                
                public static void Main()
                {
                    string updateValues = "{"
                        +"${generatePostBody(updateValues, " : ", ',"\n                        + "', true)}"
                    + "}";

                    ${isMapNotAllNulls(typeToValueMap) ?
                `string postBody = "{"
                        + "${generatePostBody(fixedTypeToValueMap, " : ", ',"\n                        + "', true)},"
                        + "\\"updateValues\\" : " + updateValues
                    + "}";
                    ` : ''}
                    string url = "${generateBareUrl(redisID, 'update')}";
                    easybase(url, postBody);
                }

            }
        `;
    }

    const _swift_code_gen = () => {
        const updateValues = 'updateValues' in typeToValueMap ? typeToValueMap.updateValues : {};
        const fixedTypeToValueMap =  {...typeToValueMap };
        delete fixedTypeToValueMap.updateValues;

        return `
        import UIKit

        func easybase(easybase_url: String, postBody: [String: Any] = [:], completion: @escaping ([EasyBaseEntry])->())
        {
            let url = URL(string: easybase_url)!
            var request = URLRequest(url: url)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpMethod = "POST"

            let jsonData = try? JSONSerialization.data(withJSONObject: postBody)
            request.httpBody = jsonData
            
            let task = URLSession.shared.dataTask(with: request) { data, response, error in
                guard let data = data, error == nil else {
                    print(error?.localizedDescription ?? "No data")
                    completion([])
                    return
                }
                completion(data)
                }
            }

            task.resume()
        }

        let url = "${generateBareUrl(redisID, 'update')}"

        let updateValues: [String: Any] = [
            ${generatePostBody(updateValues, " : ", ',\n            ')}
        ]
        ${isMapNotAllNulls(typeToValueMap) ? `
        let postBody: [String: Any] = [
            ${generatePostBody(fixedTypeToValueMap, " : ", ',\n            ')},
            "updateValues": updateValues
        ]
        ` : ""}
        easybase(easybase_url: url, postBody: postBody) { (easybase_data) -> () in
            print(easybase_data)
        }
        `;
    }



    return [
        {
            language_name: "HTML/JS",
            code_string: _javascript_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: "Node.js",
            code_string: _node_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: 'Python',
            code_string: _python_code_gen(),
            prism_code: 'python',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybase-python" title="Read the Documentation" />
        },
        {
            language_name: 'Java',
            code_string: _java_code_gen(),
            prism_code: 'java'
        },
        {
            language_name: 'C#',
            code_string: _c_sharp_code_gen(),
            prism_code: 'csharp'
        },
        {
            language_name: 'Swift',
            code_string: _swift_code_gen(),
            prism_code: 'swift'
        }
    ];
}

export const generateDELETELanguageContent = (redisID, typeToValueMap) => {
    const _javascript_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        return (
            <>
                <code className={`language-html`}>
                    {`
                    <html>
                    <head>
                        Paste this into the <head> of your html:
                        <script src="https://cdn.jsdelivr.net/npm/easybasejs/dist/bundle.js"></script>
                    </head>
                    <body>
                        ...
                    </body>
                    <script>
                    `}
                </code>
                <br />
                <br />
                <code className="language-javascript">
                    {`
                    ${isMapNotAllNulls(fixedTypeToValueMap) ? `
                    const customQuery = {
                        ${generatePostBody(fixedTypeToValueMap, " : ", ",\n                        ")}
                    }
                    ` : ''}
                    EasyBase.Delete("${redisID}"${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}` : ''}${isMapNotAllNulls(fixedTypeToValueMap) ? typeToValueMap.authentication ? ", customQuery" : ', null, customQuery' : ''})
                        .then(data => {
                            console.log(data);
                        });
                    `}
                </code>
                <br />
                <br />
                <code className="language-html">
                    {`
                    </script>
                    </html>
                    `}
                </code>
            </>
        );
    }

    const _node_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        delete fixedTypeToValueMap.authentication;
        return `
        // npm install --save easybasejs

        var EasyBase = require('easybasejs');
        ${isMapNotAllNulls(fixedTypeToValueMap) ? `
        const customQuery = {
            ${generatePostBody(fixedTypeToValueMap, " : ", ",\n            ")}
        }
        ` : ''}
        EasyBase.Delete("${redisID}"${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}` : ''}${isMapNotAllNulls(fixedTypeToValueMap) ? typeToValueMap.authentication ? ", customQuery" : ', null, customQuery' : ''})
            .then(data => {
                console.log(data);
            });
        `;
    }

    const _python_code_gen = () => {
        const pythonCustomQueryMap = { ...typeToValueMap };
        delete pythonCustomQueryMap.authentication;

        return `
        # pip install easybase-python

        from easybase-python import get, post, update, delete
        ${isMapNotAllNulls(pythonCustomQueryMap) ? `
        query = {
            ${generatePostBody(pythonCustomQueryMap, " : ", ",\n            ", false, true)}
        }
        ` : ''}
        res = delete("${redisID}"${_python_option('authentication', typeToValueMap)}${isMapNotAllNulls(pythonCustomQueryMap) ? ', customQuery=query' : ''})})
        # Successfully deleted records
        `;
    }

    const _java_code_gen = () => {

        return `
        import java.net.*;
        import java.io.*;

        public class HelloWorld{

            public static String easybase(String easybase_url, String postBody) throws Exception {
                URL url = new URL(easybase_url);
                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setRequestMethod("POST");
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Accept", "application/json");
                con.setDoOutput(true);
                con.setDoInput(true);

                OutputStream os = con.getOutputStream();
                byte[] input = postBody.getBytes("utf-8");
                os.write(input, 0, input.length);           

                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return response.toString();
            }

            public static void main(String[] args) {
                String easybase_url = "${generateBareUrl(redisID, 'delete')}";
                ${isMapNotAllNulls(typeToValueMap) ? `
                String postBody = "{"
                    + "${generatePostBody(typeToValueMap, " : ", ',"\n                    + "', true)}"
                + "}";
                ` : ''}      
                try {
                    easybase(easybase_url, ${isMapNotAllNulls(typeToValueMap) ? `postBody` : `""`});
                } catch (Exception e) {
                    System.out.println(e);                    
                }
            }
        }`;

    }

    const _c_sharp_code_gen = () => {
        return `
            using System;
            using System.Net;
            using System.Text;
            using System.IO;

            public class Program
            {	
                static void easybase(string easybase_url, string postBody)
                {
                    var request = (HttpWebRequest) WebRequest.Create(easybase_url);
                    request.Method = "POST";
                    request.ContentType = "application/json";

                    using (var stream = request.GetRequestStream())
                    {
                        stream.Write(Encoding.ASCII.GetBytes(postBody));
                    }

                    var response = (HttpWebResponse) request.GetResponse();
                    var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
                }
                
                public static void Main()
                {
                    ${isMapNotAllNulls(typeToValueMap) ?
                `string postBody = "{"
                        + "${generatePostBody(typeToValueMap, " : ", ',"\n                        + "', true)}"
                    + "}";
                    ` : ''}
                    string url = "${generateBareUrl(redisID, 'delete')}";
                    easybase(url, ${isMapNotAllNulls(typeToValueMap) ? `postBody` : `""`});
                }

            }
        `;
    }

    const _swift_code_gen = () => {
        return `
        import UIKit

        func easybase(easybase_url: String, postBody: [String: Any] = [:], completion: @escaping ([EasyBaseEntry])->())
        {
            let url = URL(string: easybase_url)!
            var request = URLRequest(url: url)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpMethod = "POST"

            let jsonData = try? JSONSerialization.data(withJSONObject: postBody)
            request.httpBody = jsonData
            
            let task = URLSession.shared.dataTask(with: request) { data, response, error in
                guard let data = data, error == nil else {
                    print(error?.localizedDescription ?? "No data")
                    completion([])
                    return
                }
                completion(data)
                }
            }

            task.resume()
        }

        let url = "${generateBareUrl(redisID, 'delete')}"
        ${isMapNotAllNulls(typeToValueMap) ? `
        let postBody: [String: Any] = [
            ${generatePostBody(typeToValueMap, " : ", ',\n            ')}
        ]
        ` : ""}
        easybase(easybase_url: url${isMapNotAllNulls(typeToValueMap) ? `, postBody: postBody` : ""}) { (easybase_data) -> () in
            print(easybase_data)
        }
        `;
    }



    return [
        {
            language_name: "HTML/JS",
            code_string: _javascript_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: "Node.js",
            code_string: _node_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: 'Python',
            code_string: _python_code_gen(),
            prism_code: 'python',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybase-python" title="Read the Documentation" />
        },
        {
            language_name: 'Java',
            code_string: _java_code_gen(),
            prism_code: 'java'
        },
        {
            language_name: 'C#',
            code_string: _c_sharp_code_gen(),
            prism_code: 'csharp'
        },
        {
            language_name: 'Swift',
            code_string: _swift_code_gen(),
            prism_code: 'swift'
        }
    ];
}

export const generateGETLanguageContent = (redisID, typeFormats, typeToValueMap) => {

    const _generate_language_variables = (col_type, col_name, lang) => {
        switch (col_type) {
            case "HH:MM 12h":
            case "HH:MM 24h":
            case "String":
            case "RTE":
            case "HTML":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: String?`
                    case "java":
                        return `String ${col_name};`
                    default:
                        break;
                }
            case "URL":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: String?`
                    case "java":
                        return `String ${col_name};`
                    default:
                        break;
                }
            case "MM/DD/YYYY":
            case "YYYY/MM/DD":
            case "dd-mmm-yyyy":
            case "dd.mm.yyyy":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: String?`
                    case "java":
                        return `String ${col_name};`
                    default:
                        break;
                }
            case "Coordinates":
            case "ISO String":
            case "Object":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: String?`
                    case "java":
                        return `String ${col_name};`
                    default:
                        break;
                }
            case "Number":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: Float?`
                    case "java":
                        return `float ${col_name};`
                    default:
                        break;
                }
            case "1/0":
            case "Total Minutes":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: Int?`
                    case "java":
                        return `int ${col_name};`
                    default:
                        break;
                }
            case "T/F":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: Bool?`
                    case "java":
                        return `boolean ${col_name};`
                    default:
                        break;
                }
            case "UNIX Stamp":
                switch (lang) {
                    case "swift":
                        return `var ${col_name}: Int?`
                    case "java":
                        return `int ${col_name};`
                    default:
                        break;
                }
            default:
                break;
        }
    }

    const key_object_example = "{ " + Object.keys(typeFormats).join(", ") + " }";

    const _javascript_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        const offset = typeToValueMap.offset ? typeToValueMap.offset : 'null';
        const limit = typeToValueMap.limit ? typeToValueMap.limit : 'null';
        delete fixedTypeToValueMap.limit;
        delete fixedTypeToValueMap.offset;
        delete fixedTypeToValueMap.authentication;
        return (
            <>
                <code className={`language-html`}>
                    {`
                    <html>
                    <head>
                        Paste this into the <head> of your html:
                        <script src="https://cdn.jsdelivr.net/npm/easybasejs/dist/bundle.js"></script>
                    </head>
                    <body>
                        ...
                    </body>
                    <script>
                    `}
                </code>
                <br />
                <br />
                <code className="language-javascript">
                    {`
                    ${isMapNotAllNulls(fixedTypeToValueMap) ? `
                    const customQuery = {
                        ${generatePostBody(fixedTypeToValueMap, " : ", ",\n                        ")}
                    }
                    ` : ''}
                    const offset = ${offset};
                    const limit = ${limit};

                    EasyBase.get("${redisID}", offset, limit${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}` : ''}${isMapNotAllNulls(fixedTypeToValueMap) ? typeToValueMap.authentication ? ", customQuery" : ', null, customQuery' : ''})
                        .then(data => {
                            console.log(data); // [ ${key_object_example}, ... ]
                        });
                    `}
                </code>
                <br />
                <br />
                <code className="language-html">
                    {`
                    </script>
                    </html>
                    `}
                </code>
            </>
        );
    }

    const _node_code_gen = () => {
        const key_object_example = "{ " + Object.keys(typeFormats).join(", ") + " }";
        const fixedTypeToValueMap = { ...typeToValueMap };
        const offset = typeToValueMap.offset ? typeToValueMap.offset : 'null';
        const limit = typeToValueMap.limit ? typeToValueMap.limit : 'null';
        delete fixedTypeToValueMap.limit;
        delete fixedTypeToValueMap.offset;
        delete fixedTypeToValueMap.authentication;

        return `
        // npm install --save easybasejs

        var EasyBase = require('easybasejs');
        ${isMapNotAllNulls(fixedTypeToValueMap) ? `
        const customQuery = {
            ${generatePostBody(fixedTypeToValueMap, " : ", ",\n            ")}
        }
        ` : ''}
        const offset = ${offset};
        const limit = ${limit};
        
        EasyBase.get("${redisID}", offset, limit${typeToValueMap.authentication ? `, ${typeToValueMap.authentication}` : ''}${isMapNotAllNulls(fixedTypeToValueMap) ? typeToValueMap.authentication ? ", customQuery" : ', null, customQuery' : '' })
            .then(data => {
                console.log(data); // [ ${key_object_example}, ... ]
            });
        `;
    }

    const _python_code_gen = () => {
        const fixedTypeToValueMap = { ...typeToValueMap };
        const offset = typeToValueMap.offset ? typeToValueMap.offset : 'None';
        const limit = typeToValueMap.limit ? typeToValueMap.limit : 'None';

        delete fixedTypeToValueMap.limit;
        delete fixedTypeToValueMap.offset;
        delete fixedTypeToValueMap.authentication;
        return `
        # pip install easybase-python
        
        from easybase-python import get, post, update, delete
        ${isMapNotAllNulls(fixedTypeToValueMap) ? `
        customQuery = {
            ${generatePostBody(fixedTypeToValueMap, " : ", ",\n            ", false, true)}
        }
        ` : ''}
        offset = ${offset}
        limit = ${limit}

        easybase_response = get("${redisID}", offset, limit${_python_option('authentication', typeToValueMap)}${isMapNotAllNulls(fixedTypeToValueMap) ? `${'authentication' in typeToValueMap ? ', customQuery=customQuery' : ', None, customQuery=customQuery'}` : ''}))
        print(easybase_response) # [ ${key_object_example}, ... ]

        `
    }

    const _java_code_gen = () => {

        return `
        import java.net.*;
        import java.io.*;

        // https://github.com/google/gson
        import com.google.gson.Gson; 
        import com.google.gson.GsonBuilder;  

        class EasybaseObj {
            ${Object.entries(typeFormats).map(([key, value]) => _generate_language_variables(value, key, "java")).join("\n            ")}
        }

        public class HelloWorld{

            public static EasybaseObj[] easybase(String easybase_url, String postBody) throws Exception {
                Gson gson = new Gson();
                URL url = new URL(easybase_url);
                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setRequestMethod("POST");
                con.setRequestProperty("Content-Type", "application/json");
                con.setRequestProperty("Accept", "application/json");
                con.setDoOutput(true);
                con.setDoInput(true);

                OutputStream os = con.getOutputStream();
                byte[] input = postBody.getBytes("utf-8");
                os.write(input, 0, input.length);           

                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }

                return gson.fromJson(response.toString(), EasybaseObj[].class);
            }

            public static void main(String[] args) {
                String easybase_url = "${generateBareUrl(redisID, 'get')}";
                ${isMapNotAllNulls(typeToValueMap) ? `
                String postBody = "{"
                    + "${generatePostBody(typeToValueMap, " : ", ',"\n                    + "', true)}"
                + "}";
                ` : ''}      
                try {
                    EasybaseObj[] easybase_data = easybase(easybase_url, ${isMapNotAllNulls(typeToValueMap) ? `postBody` : `""`});
                    System.out.println(easybase_data);
                    // [ ${key_object_example}, ... ]
                } catch (Exception e) {
                    System.out.println(e);
                    
                }
            }
        }`;

    }

    const _c_sharp_code_gen = () => {
        return `
            using System;
            using Newtonsoft.Json.Linq; // NuGet Newtonsoft.Json - https://www.newtonsoft.com/json
            using System.Net;
            using System.Text;
            using System.IO;

            public class Program
            {	
                static JArray easybase(string easybase_url, string postBody)
                {
                    var request = (HttpWebRequest) WebRequest.Create(easybase_url);
                    request.Method = "POST";
                    request.ContentType = "application/json";

                    using (var stream = request.GetRequestStream())
                    {
                        stream.Write(Encoding.ASCII.GetBytes(postBody));
                    }

                    var response = (HttpWebResponse) request.GetResponse();
                    var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
                    return JArray.Parse(responseString);
                }
                
                public static void Main()
                {
                    ${isMapNotAllNulls(typeToValueMap) ?
                `string postBody = "{"
                        + "${generatePostBody(typeToValueMap, " : ", ',"\n                        + "', true)}"
                    + "}";
                    ` : ''}
                    string url = "${generateBareUrl(redisID, 'get')}";
                    JArray x = easybase(url, ${isMapNotAllNulls(typeToValueMap) ? `postBody` : `""`});
                    Console.WriteLine(x);
                    // [ ${key_object_example}, ... ]
                }

            }
        `;
    }

    const _swift_code_gen = () => {
        return `
        import UIKit

        struct EasyBaseEntry: Codable {
            ${Object.entries(typeFormats).map(([key, value]) => _generate_language_variables(value, key, "swift")).join("\n            ")}
        }

        func easybase(easybase_url: String, postBody: [String: Any] = [:], completion: @escaping ([EasyBaseEntry])->())
        {
            let url = URL(string: easybase_url)!
            var request = URLRequest(url: url)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpMethod = "POST"

            let jsonData = try? JSONSerialization.data(withJSONObject: postBody)
            request.httpBody = jsonData
            
            let task = URLSession.shared.dataTask(with: request) { data, response, error in
                guard let data = data, error == nil else {
                    print(error?.localizedDescription ?? "No data")
                    completion([])
                    return
                }

                do {
                    let res = try JSONDecoder().decode([EasyBaseEntry].self, from: data)
                    completion(res)
                } catch let error {
                    completion([])
                    print(error)
                }
            }

            task.resume()
        }

        let url = "${generateBareUrl(redisID, 'get')}"
        ${isMapNotAllNulls(typeToValueMap) ? `
        let postBody: [String: Any] = [
            ${generatePostBody(typeToValueMap, " : ", ',\n            ')}
        ]
        ` : ""}
        easybase(easybase_url: url${isMapNotAllNulls(typeToValueMap) ? `, postBody: postBody` : ""}) { (easybase_data) -> () in
            print(easybase_data)
            // [ ${key_object_example}, ... ]
        }
        `;
    }



    return [
        {
            language_name: "HTML/JS",
            code_string: _javascript_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: "Node.js",
            code_string: _node_code_gen(),
            prism_code: 'javascript',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybasejs" title="Read the Documentation" />
        },
        {
            language_name: 'Python',
            code_string: _python_code_gen(),
            prism_code: 'python',
            footer: <HelpButtonWithText to="https://github.com/easybase/easybase-python" title="Read the Documentation" />
        },
        {
            language_name: 'Java',
            code_string: _java_code_gen(),
            prism_code: 'java'
        },
        {
            language_name: 'C#',
            code_string: _c_sharp_code_gen(),
            prism_code: 'csharp'
        },
        {
            language_name: 'Swift',
            code_string: _swift_code_gen(),
            prism_code: 'swift'
        }
    ];
}

