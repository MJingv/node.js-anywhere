<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
    <style>
        a {
            text-decoration: none
        }
        
        body {
            background-color: #AEE2D9;
            margin: 20px 0;
            padding: 1em 1.5em;
            border-style: solid;
            border-color: #22C3AA;
            border-width: 0px 1px 0px 7px;
            color: #444;
            font-size: 1rem;
            position: relative;
        }
        
        .content-text {
            line-height: 30px;
            display: block;
            font-size: 20px;
            color: #D0648A;
            font-weight: bold;
            text-shadow: 1px 1px #EFEFEF, 2px 2px #CCC;
            word-wrap: break-word;
        }
        
        .title {
            font-family: Lato, "Microsoft YaHei", sans-serif;
            font-size: 2.8rem;
            font-weight: 900;
            margin: 0.5em 0 0.25em 0;
            text-shadow: 1px 1px #EFEFEF, 3px 3px #AEE2D9;
            border-bottom-style: double;
            border-bottom-color: #22C3AA;
            border-bottom-width: 8px;
            padding-bottom: 0.2em;
            color: #666;
        }
        
        .file-name {
            line-height: 1.8em;
            border-left: 2px solid #AEE2D9;
            padding-left: 0.5rem;
            -webkit-transition: 0.5s;
            transition: 0.5s;
        }
    </style>
</head>

<body>
    <div class="title">目录Content</div>

    {{#each files}}
    <a href="{{../dir}}/{{file}}">
        <div class="content-text">
            【 {{icon}} 】
            <span class="file-name"> {{file}}</span>
        </div>
    </a>
    {{/each}}
</body>

</html>