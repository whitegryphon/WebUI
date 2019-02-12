
<div class="card">
    <div class="card-header card-header-<?php echo $site_color; ?>">
        <h4 class="card-title ">Building Segs in Visual Studio 2017</h4>
        <p class="card-category"></p>
    </div>
    <div class="card-body">
        <ol> 
            <li>Install Visual Studio 2017 (<a href="https://visualstudio.microsoft.com/vs/community/">Community Edition Installer</a>)
                <ul>
                    <li>Choose at least the following <strong>Workloads</strong>:
                        <ul>
                            <li>Desktop development with C++</li>
                            <li>Linux development with C++</li>
                        </ul>
                    </li>
                    <li>Verify the following <strong>Individual Components</strong> are selected:
                        <ul>
                            <li><strong>Code tools</strong>
                                <ul>
                                    <li>Git for Windows</li>
                                    <li>Github extension for Visual Studio</li>
                                </ul>
                            </li>
                            <li><strong>Compilers, build tools, and runtimes</strong>
                                <ul>
                                    <li>C++/CLI support (?)</li>
                                    <li>Visual C++ tools for CMake (selected by default when 'Desktop development with C++' is selectsed)</li>
                                </ul>
                            </li>
                            <li><strong>Development activities</strong>
                                <ul>
                                    <li>Visual C++ tools for CMake and Linux (selected by default when 'Linux development with C++' is selected)</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>Install Qt Creator (<a href="http://download.qt.io/archive/qt/">Open Source Installer</a>)
                <ul>
                    <li>Install to default path if possible</li>
                    <li>Components:
                        <ul>
                            <li><strong>Qt</strong>
                                <ul>
                                    <li><strong>Qt &lt;Qt_version&gt;</strong>
                                        <ul>
                                            <li>MSVC 2017 32-bit</li>
                                            <li>MSVC 2017 64-bit</li>
                                            <li>Sources (Probably do not need.)</li>
                                        </ul>
                                    </li>
                                    <li><strong>Tools</strong>
                                        <ul>
                                            <li>Qt Creator &lt;Qt_version&gt; (Must be installed)</li>
                                            <li>Qt Creator &lt;Qt_version&gt; CDB Debugger Support (Not sure if neccessary, but was checked by default)</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>Set environment variable <code>Qt5_DIR</code> to Qt installation directory
                <ul>
                    <li>See <a href="https://www.opentechguides.com/how-to/article/windows-10/113/windows-10-set-path.html">https://www.opentechguides.com/how-to/article/windows-10/113/windows-10-set-path.html</a> for help</li>
                    <li>Set <code>Qt5_DIR</code> environment variable to the Qt path, e.g., <code>"C:\Qt\Qt&&lt;Qt_version&gt;\&lt;Qt_version&gt;\msvc2017\lib\cmake\Qt5"</code></li>
                </ul>
            </li>
            <li>Configure Visual Studio 2017
                <ul>
                    <li>Install <strong>Qt Visual Studio Tools</strong> extension
                        <ul>
                            <li><strong>Tools</strong> > <strong>Extensions and Updates...</strong></li>
                            <li>Select <strong>Online</strong> in tree</li>
                            <li>Searching for <em>Qt</em> should be enough to find it</li>
                            <li>Install and restart Visual Studio</li>
                        </ul>
                    </li>
                    <li>Configure <strong>Qt Visual Studio Tools</strong>
                        <ul>
                            <li><strong>Qt VS Tools</strong> > <strong>Qt Options</strong> > <strong>Qt Versions Tab</strong> > <strong>Add</strong></li>
                            <li>Enter unique <strong>Version Name</strong>, e.g., "Qt &lt;Qt_version&gt; 32-bit"</li>
                            <li>Enter or browse to <strong>Path</strong>, e.g., "C:\Qt\Qt&lt;Qt_version&gt;\&lt;Qt_version&gt;\msvc2017"</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>Clone repository from Github (<a href="https://github.com/Segs/Segs">https://github.com/Segs/Segs</a>)
            <li>Open repository
                <ul>
                    <li><strong>File</strong> > <strong>Open</strong> > <strong>CMake...</strong></li>
                    <li>Navigate to Segs repository and select <em>CMakeLists.txt</em> from root directory.</li>
                </ul>
            </li>
            <li>Edit CMake Configurations by clicking on the <strong>Configuration</strong> dropdown and selecting <em>x86-Debug</em>. This will create the <a href="assets/files/CMakeSettings.json" target="_blank"><code>CMakeSettings.json</code></a>. See below for my configuration.<img src="/assets/img/cmake-config.png" class="img-fluid" alt="Responsive image">
            <li>Manually build required 3rd Party components:
                <ul>
                    <li><strong>CMake</strong> > <strong>Build Only</strong> > <strong>ACE_BUILD</strong></li>
                    <li><strong>CMake</strong> > <strong>Build Only</strong> > <strong>cereal_BUILD</strong></li>
                </ul>
            </li>
            <li>Build project
                <ul>
                    <li><strong>CMake</strong> > <strong>Build All</strong></li>
                </ul>
            </li>
            <li>Copy <code>ACEd.dll</code> to build <code>out</code> directory.</li>
            <li>Install MySQL Server.</li>
            <li>Install MySQL Connector/C
                <ul>
                    <li>Download MySQL Installer <a href="https://dev.mysql.com/downloads/installer/">https://dev.mysql.com/downloads/installer/</a></li>
                    <li>Run installer and select both <em>Connector/C++ 8.0</em> and <em>MySQL Connector/C 6.1</em>. I installed x64 versions.</li>
                    <li>Copy <code>libmysql.dll</code>, <code>libmysql.lib</code>, and <code>mysqlclient.lib</code> to build's <code>out</code> directory. 
                        <ul>
                            <li><code>libmysql.dll</code> and <code>libmysql.lib</code> are in <code>C:\Program Files (x86)\MySQL\MySQL Connector C 6.1\lib</code> on a default install.</li>
                            <li><code>mysqlclient.lib</code> is in <code>C:\Program Files (x86)\MySQL\MySQL Connector C 6.1\lib\vs14</code> on a default install.</li>
                        </ui>
                    </li>
                </ul>
            </li>
            <li>Install and copy OpenSSL library</li>
        </ol>
                        
        <p><strong>NOTE:</strong> <em>One of the firewall ports in the README.md are incorrect. It should be 2106 and not 2016 as the document lists</em></p>
        <p>Configure Windows Firewall
            <ul>          
                <li>TCP Ports: 2106</li>
                <li>UDP Ports: 7000-7200</li>
            </ul>
        </p>

        <h3>CMakeSettings.json</h3>

        <p>This is the <a href="assets/files/CMakeSettings.json" target="_blank">CMakeSettings.json</a> configuration file I use. I have changed the <code>BuildRoot</code> and <code>installRoot</code> to point to the <code>${projectDir}</code> instead of the default.</p>

        <pre>
        {
        "configurations": [
            {
            "name": "x86-Debug",
            "generator": "Ninja",
            "configurationType": "Debug",
            "inheritEnvironments": [
                "msvc_x86"
            ],
            "buildRoot": "${projectDir}\\..\\${name}\\build\\${workspaceHash}",
            "installRoot": "${projectDir}\\..\\${name}\\install\\${workspaceHash}",
            "cmakeCommandArgs": "",
            "buildCommandArgs": "-v",
            "ctestCommandArgs": ""
            },
            {
            "name": "x86-Release",
            "generator": "Ninja",
            "configurationType": "Release",
            "inheritEnvironments": [
                "msvc_x86"
            ],
            "buildRoot": "${projectDir}\\..\\${name}\\build\\${workspaceHash}",
            "installRoot": "${projectDir}\\..\\${name}\\install\\${workspaceHash}",
            "cmakeCommandArgs": "",
            "buildCommandArgs": "-v",
            "ctestCommandArgs": ""
            }
          ]
        }
        </pre>
    </div>
</div>
