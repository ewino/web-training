from setuptools import setup, find_packages


setup(
    name='unistore',
    version='1.0',
    packages=find_packages(),
    include_package_data=True,
    install_requires=['logbook', 'tornado', 'flask'],
    entry_points={
        'console_scripts': [
            'unistored = unistore.run_server:run_server'
        ]
    }
)
